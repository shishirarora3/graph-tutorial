import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { UserAgentApplication } from 'msal';
import ErrorMessage from './ErrorMessage';
import config from './Config';
import { getUserDetails } from './GraphService';
import 'bootstrap/dist/css/bootstrap.css';
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
    if (this.state.error) {
      error = <ErrorMessage message={this.state.error.message} debug={this.state.error.debug} />;
    }

    return (
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
      </Router>
    );
  }

  setErrorMessage(message, debug) {
    this.setState({
      error: {message: message, debug: debug}
    });
  }

  async login() {
    try {
      await this.userAgentApplication.loginPopup(
        {
          scopes: config.scopes,
          prompt: "select_account"
      });
      await this.getUserProfile();
    }
    catch(err) {
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

      if (accessToken) {
        // Get the user's profile from Graph
        var user = await getUserDetails(accessToken);
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
};

export default App;
