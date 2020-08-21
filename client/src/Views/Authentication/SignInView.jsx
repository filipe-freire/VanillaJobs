import React, { Component } from 'react';

import { signIn } from './../../services/authentication';

class SignInView extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      error: null
    };
  }

  handleFormSubmission = e => {
    e.preventDefault();

    signIn();
    //creating service for sign-in form submission
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div>
        <h3>Sign-in</h3>
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="input-email">Email</label>
          <input
            id="input-email"
            type="text"
            placeholder="Email"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
          <label htmlFor="input-password">Password</label>
          <input
            id="input-password"
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <button>Sumbit</button>
        </form>
      </div>
    );
  }
}

export default SignInView;
