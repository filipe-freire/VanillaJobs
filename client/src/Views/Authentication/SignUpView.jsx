import React, { Component } from 'react';
import { signUp } from '../../services/authentication';

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
      <div>
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="input-companyName">Company Name</label>
          <input
            id="input-companyName"
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />

          <label htmlFor="input-email">Email</label>
          <input
            id="input-email"
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />

          <label htmlFor="input-password">Password</label>
          <input
            id="input-password"
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />

          <button>Sign Up</button>
        </form>
      </div>
    );
  }
}

export default AuthSignUpView;
