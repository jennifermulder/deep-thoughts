import React from 'react';

// add these two library import statements
// provider component provides data to call other components
import { ApolloProvider } from '@apollo/react-hooks';
// to get data
import ApolloClient from 'apollo-boost';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';

//establish connection to the back-end server's /graphql endpoint using Appllo
// react runs on 3000, server runs on 3001
// everythign in between the server tags has access to the API server through client
const client = new ApolloClient({
  uri: '/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='flex-column justify-flex-start min-100-vh'>
        <Header />
        <div className='container'>
          <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
