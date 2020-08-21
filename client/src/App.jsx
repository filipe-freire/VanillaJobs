import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AuthSignUpView from './Views/Authentication/SignUpView';
import './App.css';

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
            <ProtectedRoute
              path="/authentication/sign-up"
              render={props => <AuthSignUpView {...props} onUserUpdate={this.handleUserUpdate} />}
              authorized={!this.state.user}
              redirect="/"
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
