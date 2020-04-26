import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { UserAgentApplication } from 'msal';
import ErrorMessage from './ErrorMessage';
import config from './Config';
import { getUserDetails } from './GraphService';
import {CalendarBox} from './calendar/components/CalendarBox';

const App = class App extends Component {
  constructor(props) {
    super(props);
    const userAgentApplication = this.userAgentApplication = new UserAgentApplication({
        auth: {
            clientId: config.appId,
            navigateToLoginRequestUrl: false,
            redirectUri: config.redirectUri
        }
    });
    userAgentApplication.handleRedirectCallback((error, response) => {
      console.log(error, response.accessToken, response);
    });
    var user = this.userAgentApplication.getAccount();
    console.log("got account", user);
    this.state = {
      isAuthenticated: (user !== null),
      user: {},
      error: null
    };

    if (user) {
      // Enhance user object with data from Graph
      this.getUserProfile();
    }else{
      this.login();
    }
  }

  render() {
    let error = null;
    const {user} =  this.state;
    //empty
    console.log("user in render", user);
    /**
     * location: 
     */
    if (this.state.error) {
      error = <ErrorMessage message={this.state.error.message} debug={this.state.error.debug} />;
    }

    return (
        <>
     <pre>
       {JSON.stringify(user)}
       {JSON.stringify(window.location)}
    </pre>
      <Router>
            <Route exact path="/"
              render={(props) =>
                <CalendarBox {...props}
                             headerText="Calendar"
                             user={user}
                             showError={this.setErrorMessage.bind(this)}
                             select="id,subject,start,end,location,body"
                />
              } />
            <Route exact path="/event-details/:etag"
               render={(props, params) =>
                   <CalendarBox {...props} params={params}
                                headerText="Calendar Details"
                                user={user}
                                showError={this.setErrorMessage.bind(this)}
                                select={false}
                   />
               } />
      </Router></>
    );
  }

  setErrorMessage(message, debug) {
    this.setState({
      error: {message: message, debug: debug}
    });
  }

  async login() {
    try {
      const s = await this.userAgentApplication.loginPopup(
        {
          scopes: config.scopes,
          prompt: "select_account"
      });
      console.log("login popup closed idToken, idTokenClaims", s.idToken, s.idTokenClaims);
      /**
       * { uniqueId: "98e50d11-9e73-44e3-baf7-682c838db2ca",
       * tenantId: "d4f08ae6-b571-462b-a459-b56a8c0b2c14",
       * tokenType: "id_token",
       * idToken: Object,
       * idTokenClaims: Object,
       * accessToken: null,
       * scopes: Array[0], expiresOn: Date 2020-04-25T23:26:02.000Z, account: Object,
       * accountState: "156aeb73-9c3c-4649-905e-80ba1cca4f93", 1 more… }
       */
      const g = await this.getUserProfile();
      console.log("got User Profile", g);//undefined if not logged in
    }
    catch(err) {
      console.log("got error", err);
      var error = {};

      if (typeof(err) === 'string') {
        var errParts = err.split('|');
        error = errParts.length > 1 ?
          { message: errParts[1], debug: errParts[0] } :
          { message: err };
      } else {
        error = {
          message: err.message,
          debug: JSON.stringify(err)
        };
      }

      this.setState({
        isAuthenticated: false,
        user: {},
        error: error
      });
    }
  }

  logout() {
    this.userAgentApplication.logout();
  }

  async getUserProfile() {
    try {
      // Get the access token silently
      // If the cache contains a non-expired token, this function
      // will just return the cached token. Otherwise, it will
      // make a request to the Azure OAuth endpoint to get a token

      var accessToken = await this.userAgentApplication.acquireTokenSilent({
        scopes: config.scopes
      });
      /**
       * Array [ "Calendars.Read", "openid", "profile", "User.Read", "email" ]
       * { uniqueId: "98e50d11-9e73-44e3-baf7-682c838db2ca",
       * tenantId: "d4f08ae6-b571-462b-a459-b56a8c0b2c14",
       * tokenType: "access_token",
       * idToken: Object,
       * idTokenClaims: Object,
       * accessToken: "eyJ0eXAiOiJKV1QiLCJub25jZSI6InNHcGV…",
       * scopes: [ "Calendars.Read", "openid", "profile", "User.Read", "email" ],
       * expiresOn: Date 2020-04-25T23:26:02.000Z,
       * account: Object,
       * accountState: "22e88e26-d1ab-4581-95f8-ef55310e53b1",
       * 1 more… }
       */
      if (accessToken) {
        // Get the user's profile from Graph
        var user = await getUserDetails(accessToken);
        console.log("got acquireTokenSilent, getUserDetails", user);
        this.setState({
          isAuthenticated: true,
          user: {
            displayName: user.displayName,
            email: user.mail || user.userPrincipalName
          },
          error: null
        });
        document.head.getElementsByTagName("title")[0].text = `Calendar - ${user.displayName} - Outlook`;
      }
    }
    catch(err) {
      console.log(err);
      var error = {};
      if (typeof(err) === 'string') {
        var errParts = err.split('|');
        error = errParts.length > 1 ?
          { message: errParts[1], debug: errParts[0] } :
          { message: err };
      } else {
        error = {
          message: err.message,
          debug: JSON.stringify(err)
        };
        console.log(error);
      }

      this.setState({
        isAuthenticated: false,
        user: {},
        error: error
      });
    }
  }
};

export default App;
