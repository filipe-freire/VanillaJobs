import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import SignUpView from './Views/Authentication/SignUpView';
import SignInView from './Views/Authentication/SignInView';

import './App.css';

import Homepage from './Views/Homepage/Homepage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      user: null
    };
  }

  handleUserUpdate = user => {
    this.setState({
      user
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Vanilla Jobs</h1>
        <BrowserRouter>
          <Switch>
            <Route component={Homepage} />

            <ProtectedRoute
              path="/authentication/sign-up"
              render={props => (
                <SignUpView {...props} onUserUpdate={this.handleUserUpdate} />
              )}
              authorized={!this.state.user}
              redirect="/"
            />

            <ProtectedRoute
              path="/authentication/sign-in"
              render={props => (
                <SignInView {...props} onUserUpdate={this.handleUserUpdate} />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
