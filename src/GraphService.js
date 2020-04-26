var graph = require('@microsoft/microsoft-graph-client');

function getAuthenticatedClient(accessToken) {
  // Initialize Graph client
  const client = graph.Client.init({
    // Use the provided access token to authenticate
    // requests
    authProvider: (done) => {
      done(null, accessToken.accessToken);
    }
  });

  return client;
}

export async function getUserDetails(accessToken) {

    console.log("getUserDetails");
  const client = getAuthenticatedClient(accessToken);
  const user = await client.api('/me').get();
    console.log("getUserDetails: user", user );
  return user;
}

export async function getEvents(accessToken, select) {
    const client = getAuthenticatedClient(accessToken);
    if(select === false){
        return;
    }
    const events = await client
        .api('/me/events')
        .orderby('createdDateTime DESC')
        .select(select)
        .get();

    return events;
}