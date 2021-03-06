import React, { Component } from 'react';

import Button from './../../components/Button';
import InputText from './../../components/InputText';

import { signIn } from './../../services/authentication';

import './authentication.scss';

class SignInView extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: null
    };
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmission = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const body = { email, password };
    signIn(body)
      .then(data => {
        //console.log('this is the user', data.user);
        const { user } = data;
        this.props.onUserUpdate(user);
      })
      .catch(err => {
        this.setState({
          error: 'There was an error either with your email or password'
        });
        console.dir(err.response);
      });
    //creating service for sign-in form submission
  };

  render() {
    return (
      <div className="authentication-container py-5 my-5 d-flex flex-column justify-content-center mx-auto">
        <h3>Sign-in</h3>
        <form onSubmit={this.handleFormSubmission} className="mx-auto ">
          <InputText
            id="email"
            type="email"
            value={this.state.email}
            handleChange={this.handleInputChange}
            label="Email"
          />
          <InputText
            id="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleInputChange}
            label="Password"
          />

          {this.state.error && (
            <div
              className="error-block d-flex rounded align-items-center py-2 justify-content-center"
              style={{ backgroundColor: 'rgba( 244,175,180, .5 )' }}
            >
              <p className="m-0">{this.state.error}</p>
            </div>
          )}

          <Button name="Sign in" />
        </form>
      </div>
    );
  }
}

export default SignInView;
