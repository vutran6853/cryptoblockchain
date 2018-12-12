import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { HashRouter } from 'react-router-dom';
import routes from './routes';
import NavBar from './components/navBar/navBar';
import { Provider } from 'react-redux';
import store from './duck/store';
const url = process.env.REACT_APP_URL

// apollo client setup
const client = new ApolloClient({
  uri: url
});

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <ApolloProvider client={ client }>
          <HashRouter>
            <div className="App">
            <NavBar/>
              { routes }
            </div>
          </HashRouter>
        </ApolloProvider>
      </Provider>
    );
  }
}

export default App;
