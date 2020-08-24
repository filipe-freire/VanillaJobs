import React, { Component } from 'react';
import { submitApplication } from '../../services/application';

class FormView extends Component {
  constructor() {
    super();
    this.state = {
      candidateName: '',
      candidateEmail: '',
      candidateLocation: '',
      motivation: '',
      linkedinUrl: '',
      githubUrl: ''
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

    const {
      candidateName,
      candidateEmail,
      candidateLocation,
      motivation,
      linkedinUrl,
      githubUrl
    } = this.state;
    const body = {
      candidateName,
      candidateEmail,
      candidateLocation,
      motivation,
      linkedinUrl,
      githubUrl
    };
    submitApplication(body) // call sign up method from services
      .then(data => {
        // receives json file from backend
        console.log(data);
        this.props.history.push(`/`); // REDIRECT TO A "APPLICATION SUBMITTED SUCCESSFULLY PAGE"
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <h1>Application Form View</h1>
        {/* ----------- !Put JobPost Component Here! -------------- */}
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="input-candidateName">Your Name</label>
          <input
            id="input-candidateName"
            type="text"
            name="candidateName"
            placeholder="John Smith"
            value={this.state.candidateName}
            onChange={this.handleInputChange}
          />

          <label htmlFor="input-candidateEmail">Email</label>
          <input
            id="input-candidateEmail"
            type="email"
            name="candidateEmail"
            placeholder="johndoe@example.com"
            value={this.state.candidateEmail}
            onChange={this.handleInputChange}
          />

          <label htmlFor="input-candidateLocation">Your Location</label>
          <input
            id="input-candidateLocation"
            type="text"
            name="candidateLocation"
            placeholder="Lisbon"
            value={this.state.candidateLocation}
            onChange={this.handleInputChange}
          />

          <label htmlFor="input-motivation">Why Should You Get This Job?</label>
          <input
            id="input-motivation"
            type="text"
            name="motivation"
            placeholder="I have 5y+ of experience working with React, JavaScript and Node.js"
            value={this.state.motivation}
            onChange={this.handleInputChange}
          />

          {/* ------------ Resumé upload ------------ */}
          {/* ------------ Photo upload ------------ */}

          <label htmlFor="input-linkedinUrl">Your LinkedIn URL</label>
          <input
            id="input-linkedinUrl"
            type="text"
            name="linkedinUrl"
            placeholder="https://www.linkedin.com/in/john-doe/"
            value={this.state.linkedinUrl}
            onChange={this.handleInputChange}
          />

          <label htmlFor="input-githubUrl">Your GitHub URL</label>
          <input
            id="input-githubUrl"
            type="text"
            name="githubUrl"
            placeholder="https://www.github.com/john-doe"
            value={this.state.githubUrl}
            onChange={this.handleInputChange}
          />

          <button>Sign Up</button>
        </form>
      </div>
    );
  }
}

export default FormView;
