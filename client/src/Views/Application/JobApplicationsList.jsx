import React, { Component } from 'react';
import { loadNumOfApplicants } from '../../services/application';
import { Link } from 'react-router-dom';
import Button from './../../components/Button';

import './styles/applicant-profile.scss';

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
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="Applicant-container mx-auto mt-5">
        {this.state.applicants &&
          this.state.applicants.map(candidate => (
            <div key={candidate._id}>
              <h2 className="text-left">{candidate.candidateName}</h2>
              <div className="mt-5">
                <p className="text-left">
                  <span>Email:</span> {candidate.candidateEmail}
                </p>
                <p className="text-left">
                  <span>Location:</span> {candidate.candidateLocation}
                </p>
                <p className="text-left">
                  <span>Motivation:</span> {candidate.motivation}
                </p>
                <p className="text-left">
                  <span>Linkedin page: </span>
                  <a
                    href={`https://${candidate.linkedinUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {candidate.linkedinUrl}
                  </a>
                </p>
                <p className="text-left">
                  <span>Github page: </span>
                  <a
                    href={`https://${candidate.githubUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {candidate.githubUrl}
                  </a>
                </p>
              </div>
            </div>
          ))}
        <Link to={`/jobpost/${this.props.match.params.id}`}>
          <Button name="Back" />
        </Link>
      </div>
    );
  }
}

export default JobApplications;
