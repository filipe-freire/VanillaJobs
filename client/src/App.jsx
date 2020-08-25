import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import SignUpView from './Views/Authentication/SignUpView';
import SignInView from './Views/Authentication/SignInView';
import ErrorView from './Views/ErrorView';
import { signOut } from './services/authentication';
import { loadMe } from './services/authentication';
import Homepage from './Views/Homepage/Homepage';
import FormView from './Views/Application/FormView';
import CreateView from './Views/JobPosts/CreateView';
import EditView from './Views/JobPosts/EditView';
import Profile from './Views/Company/Profile';
import ProfileEditView from './Views/Company/ProfileEditView';
import SingleView from './Views/JobPosts/SingleView';
import FormSubmittedView from './Views/Application/FormSubmittedView';
import AllCompanies from './Views/Company/AllCompanies';

import './App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      user: null
    };
  }

  componentDidMount() {
    loadMe()
      .then(data => {
        const user = data.user;

        this.handleUserUpdate(user);

        this.setState({
          loaded: true
        });
      })
      .then(error => {
        console.log(error);
      });
  }

  handleUserUpdate = user => {
    //console.log('handleUserUpdate ran: ', user);
    this.setState({
      user
    });
  };

  handleSignOut = () => {
    signOut()
      .then(() => {
        this.handleUserUpdate(null);
        window.location.href = '/'; // redirects to homepage on sign-out
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar user={this.state.user} onSignOut={this.handleSignOut} />
          <Switch>
            <Route path="/" component={Homepage} exact />

            <Route path="/profile/:id/edit" component={ProfileEditView} exact />
            {this.state.user && (
              <Route
                path={'/profile/:id'}
                render={props => (
                  <Profile {...props} user={this.state.user} exact />
                )} // Anytime we want to pass app.jsx props and more to the component, we use this syntax
              />
            )}

            <ProtectedRoute
              path="/authentication/sign-up"
              render={props => (
                <SignUpView {...props} onUserUpdate={this.handleUserUpdate} />
              )}
              authorized={!this.state.user}
              redirect="/" // REDIRECT TO COMPANY PROFILE VIEW
            />

            <ProtectedRoute
              path="/authentication/sign-in"
              render={props => (
                <SignInView {...props} onUserUpdate={this.handleUserUpdate} />
              )}
              authorized={!this.state.user}
              redirect="/" // REDIRECT TO COMPANY PROFILE VIEW
            />

            <Route path="/jobpost/create" component={CreateView} />
            <Route path="/jobpost/:id/edit" component={EditView} />
            <Route path="/jobpost/:id" component={SingleView} exact />
            <Route path="/jobpost/:id/application" component={FormView} />

            <Route path="/listCompanies" component={AllCompanies} />

            <Route path="/application/success" component={FormSubmittedView} />
            <Route path="/error" component={ErrorView} />
            <Redirect from="/" to="/error" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
