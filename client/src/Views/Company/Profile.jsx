import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadUser } from './../../services/company';
import { loadAllByCreatorId } from '../../services/jobPosts';
import { loadNumOfApplicants } from '../../services/application';
import './styles/profile.scss';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      photo: null,
      jobPosts: [],
      applicants: {}
    };
  }

  async componentDidMount() {
    const id = this.props.match.params.id;

    loadAllByCreatorId(id)
      .then(async data => {
        const { jobPosts } = data;

        const applicants = await jobPosts.reduce(async (acc, post) => {
          const numOfApp = await this.numOfApplicants(post._id);
          const newItem = {
            ...acc,
            [post._id]: numOfApp.applicants.length
          };
          //console.log(newItem);
          this.setState({ [post._id]: numOfApp.applicants.length });
          acc = newItem;
          return acc;
        }, {});

        this.setState({ jobPosts, applicants });
      })
      .catch(error => console.log(error));

    loadUser(id)
      .then(data => {
        const { user } = data;

        this.setState({ user });
      })
      .catch(error => console.log(error));
  }

  numOfApplicants = async id => {
    return await loadNumOfApplicants(id);
  };
  /*    .then(data => {
        console.log(data);
        this.setState({ applicants: { [id]: data.applicants.length } });
        //return data.applicants.length;
      })
      .catch(error => console.log(error));
  }
  */

  render() {
    // console.log(this.state.jobPosts[0]);
    return (
      <div className="profile-view">
        {(this.state.user && (
          <>
            <div className="company-info">
              <img src={this.state.user.logo} alt={`${this.state.user.companyName}'s logo`} />{' '}
              <p className="company-name">
                {this.state.user.companyName}{' '}
                <Link to={`/profile/${this.props.match.params.id}/edit`}>
                  <img
                    src="https://res.cloudinary.com/dlfxinw9v/image/upload/v1598479648/edit-svg_lt7uw2.png"
                    alt="Edit Profile"
                  />
                </Link>{' '}
              </p>
              <p className="company-foundedDate">
                <span>Founded in:</span> {this.state.user.foundedDate}
              </p>
              <p className="company-location">
                <span>Location:</span> {this.state.user.location}
              </p>
              <p className="company-website">
                <span>Website:</span>{' '}
                <a href={`${this.state.user.websiteUrl}`} target="_blank" rel="noopener noreferrer">
                  {this.state.user.websiteUrl}
                </a>
              </p>
              <p className="company-size">
                <span>Company Size:</span> {this.state.user.sizeInEmployees} employees
              </p>
            </div>
            <div className="company-summary">
              <p className="company-summary-title">Company Summary</p>
              <p className="company-summary-text">{this.state.user.summary}</p>
            </div>
            <div className="company-jobPosts">
              <h2>Job Posts</h2>
              {/* map through JSON with all the jobPosts created by the user */}
              {(this.state.jobPosts[0] && (
                <ul>
                  {this.state.jobPosts.map(post => (
                    <li key={post._id}>
                      <Link
                        className="Job-post d-flex p-2 my-2"
                        key={post._id}
                        to={`/jobpost/${post._id}`}
                      >
                        <img
                          className="jobPost-img"
                          src={this.state.user.logo}
                          alt="company logo"
                        />
                        <div className="d-flex flex-column justify-content-between align-items-start ml-4">
                          <h5 className="m-0">{post.title}</h5>
                          <p className="m-0"> Seniority: {post.seniority}</p>
                          <p className="m-0">Location: {post.location}</p>
                        </div>
                      </Link>
                      {/* <Link to={`/jobpost/${post._id}`}>
                        <h2>{post.title}</h2>
                      </Link> */}
                      <Link to={`/jobApplications/${post._id}`}>
                        Number of Applicants: {this.state[post._id]}
                        {/*Number of Applicants: {this.numOfApplicants(post._id)}{' '}*/}
                      </Link>
                    </li>
                  ))}
                </ul>
              )) || <p>No Job Posts Available </p>}
            </div>
          </>
        )) || <h2>Loading...</h2>}
      </div>
    );
  }
}

export default Profile;
