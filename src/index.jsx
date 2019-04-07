import React from 'react';
import ReactDOM from 'react-dom';
import { fetch } from 'whatwg-fetch';
import ApolloClient from 'apollo-client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import './base.scss';

const link = createHttpLink({
  uri: process.env.RENT_QL || process.env.LOCAL_RENT_QL,
  credentials: 'include',
  fetch,
});

const client = new ApolloClient({
  dataIdFromObject: o => o.id,
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  link,
  cache: new InMemoryCache(),
});

const render = (Component) => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Router>
        <AppContainer>
          <Component />
        </AppContainer>
      </Router>
    </ApolloProvider>,
    document.getElementById('content'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => { render(App); });
}
