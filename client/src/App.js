import React from 'react';

// add these two library import statements
// provider component provides data to call other components
import { ApolloProvider } from '@apollo/react-hooks';
// rename BrowserRouter to Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// to get data
import ApolloClient from 'apollo-boost';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

//establish connection to the back-end server's /graphql endpoint using Appllo
// react runs on 3000, server runs on 3001
// everythign in between the server tags has access to the API server through client
const client = new ApolloClient({
  // retrieve token from local storage
  request: operation => {
    const token = localStorage.getItem('id_token');
    // headers to include token
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile/:username?" component={Profile} />
              <Route exact path="/thought/:id" component={SingleThought} />

              <Route component={NoMatch} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
