import React, { Component } from 'react';
import { submitApplication } from '../../services/application';

import InputText from './../../components/InputText';
import Button from './../../components/Button';

import './../JobPosts/styles/job-post-text-inputs.scss';
import './form-general.scss';

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

    const jobId = this.props.match.params.id;
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
      githubUrl,
      jobId
    };

    submitApplication(body) // call sign up method from services
      .then(data => {
        // receives json file from backend
        console.log(data);
        this.props.history.push(`/application/success`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmission} className="py-4">
        <InputText
          id="candidateName"
          value={this.state.candidateName}
          handleChange={this.handleInputChange}
          label="Name"
        />

        <InputText
          id="candidateEmail"
          type="email"
          value={this.state.candidateEmail}
          handleChange={this.handleInputChange}
          label="Email"
        />

        <InputText
          id="candidateLocation"
          value={this.state.candidateLocation}
          handleChange={this.handleInputChange}
          label="Your location"
        />

        <InputText
          id="motivation"
          value={this.state.motivation}
          handleChange={this.handleInputChange}
          label="Motivation letter"
        />

        {/* <label htmlFor="input-motivation">Why Should You Get This Job?</label>
          <input
            id="input-motivation"
            type="text"
            name="motivation"
            placeholder="I have 5y+ of experience working with React, JavaScript and Node.js"
            value={this.state.motivation}
            onChange={this.handleInputChange}
          /> */}

        {/* ------------ Resumé upload ------------ */}
        {/* ------------ Photo upload ------------ */}

        <InputText
          id="linkedinUrl"
          value={this.state.linkedinUrl}
          handleChange={this.handleInputChange}
          label="LinkedIn URL"
        />
        <InputText
          id="githubUrl"
          value={this.state.githubUrl}
          handleChange={this.handleInputChange}
          label="GitHub URL"
        />

        <Button name="Apply" />
      </form>
    );
  }
}

export default FormView;
