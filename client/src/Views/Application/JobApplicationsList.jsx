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
        <h1>Single Job Applications</h1>
        <ul>
          {this.state.applicants &&
            this.state.applicants.map(candidate => (
              <li key={candidate._id}>
                <p>Candidate name: {candidate.candidateName}</p>
                <p>Candidate email: {candidate.candidateEmail}</p>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default JobApplications;
