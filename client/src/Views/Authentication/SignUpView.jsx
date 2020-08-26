import React, { Component } from 'react';
import { signUp } from '../../services/authentication';

import Button from './../../components/Button';
import InputText from './../../components/InputText';

import './authentication.scss';

class AuthSignUpView extends Component {
  constructor() {
    super();
    this.state = {
      companyName: '',
      email: '',
      password: ''
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmission = event => {
    event.preventDefault();
    const { companyName, email, password } = this.state;
    const body = { companyName, email, password };
    signUp(body) // call sign up method from services
      .then(data => {
        // receives json file from backend
        const { user } = data;
        this.props.onUserUpdate(user); // update user state in app.jsx
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="authentication-container py-5 my-5 d-flex flex-column justify-content-center mx-auto">
        <h3>Sign-in</h3>
        <form onSubmit={this.handleFormSubmission} className="mx-auto ">
          <InputText
            id="companyName"
            value={this.state.companyName}
            handleChange={this.handleInputChange}
            label="Name"
          />
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

          <Button name="Sign in" />
        </form>
      </div>
    );
  }
}

export default AuthSignUpView;
