import React, { Component } from 'react';
import { loadNumOfApplicants } from '../../services/application';

class JobApplications extends Component {
  constructor() {
    super();
    this.state = {
      applicants: []
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    loadNumOfApplicants(id)
      .then(data => {
        const { applicants } = data;
        this.setState({
          applicants
        });

        console.log(this.state);
      })
      .catch(error => console.log(error));
  }

  render() {
    //console.log(this.state.applicants);
    return (
      <div>
        <h1 style={{ marginTop: '.5em' }}>Single Job Applications</h1>
        <ul style={{ padding: '1em', listStyle: 'none' }}>
          {this.state.applicants &&
            this.state.applicants.map(candidate => (
              <li key={candidate._id} style={{ borderTop: '2px solid lightgrey' }}>
                <p style={{ marginTop: '.5em', fontSize: '1.2em' }}>
                  <span style={{ fontWeight: '500' }}>Candidate name:</span>{' '}
                  {candidate.candidateName}
                </p>
                <p style={{ marginTop: '.5em', fontSize: '1.2em' }}>
                  <span style={{ fontWeight: '500' }}>Email:</span> {candidate.candidateEmail}
                </p>
                <p style={{ marginTop: '.5em', fontSize: '1.2em' }}>
                  <span style={{ fontWeight: '500' }}>Location:</span> {candidate.candidateLocation}
                </p>
                <p style={{ marginTop: '.5em', fontSize: '1.2em' }}>
                  <span style={{ fontWeight: '500' }}>Motivation:</span> {candidate.motivation}
                </p>
                <p style={{ marginTop: '.5em', fontSize: '1.2em' }}>
                  <span style={{ fontWeight: '500' }}>Linkedin page:</span>{' '}
                  <a
                    href={`https://${candidate.linkedinUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {candidate.linkedinUrl}
                  </a>{' '}
                </p>
                <p style={{ marginTop: '.5em', fontSize: '1.2em' }}>
                  <span style={{ fontWeight: '500' }}>Github page:</span>{' '}
                  <a
                    href={`https://${candidate.githubUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {candidate.githubUrl}
                  </a>{' '}
                </p>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default JobApplications;
