import React, { Component } from 'react';

class JobApplications extends Component {
  constructor() {
    super();
    this.state = {
      jobApplications: []
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    console.log(id);

    // loadThisJobApplications(id);
  }

  render() {
    return (
      <div>
        <h1>Single Job Applications</h1>
        <ul>
          {this.state.jobApplications.map(jobApplication => (
            <>
              <h4>{jobApplication.candidateName}</h4>
              <h4>{jobApplication.candidateEmail}</h4>
            </>
          ))}
        </ul>
      </div>
    );
  }
}

export default JobApplications;
