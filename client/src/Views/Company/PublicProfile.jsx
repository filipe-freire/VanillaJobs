import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadUser } from './../../services/company';
import { loadAllByCreatorId } from '../../services/jobPosts';

class PublicProfile extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      jobPosts: null
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    loadAllByCreatorId(id)
      .then(data => {
        const { jobPosts } = data;

        this.setState({ jobPosts });
      })
      .catch(error => console.log(error));

    loadUser(id)
      .then(data => {
        const { user } = data;

        this.setState({ user });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="profile-view-public">
        {(this.state.user && (
          <>
            <div className="company-info">
              <img src={this.state.user.logo} alt={`${this.state.user.companyName}'s logo`} />{' '}
              <p className="company-name">{this.state.user.companyName} </p>
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
                    </li>
                  ))}
                </ul>
              )) || <p>No Job Posts Available </p>}
            </div>
          </>
        )) || <h2>Loading...</h2>}
      </div>

      // <div>
      //   {(this.state.user && (
      //     <>
      //       <div className="company-info">
      //         <img
      //           src={this.state.user.logo}
      //           alt={`${this.state.user.companyName}'s logo`}
      //           style={{ maxWidth: '150px', maxHeight: '150px' }}
      //         />
      //         <p className="company-name"> {this.state.user.companyName} </p>
      //         <p className="company-location">Location: {this.state.user.location}</p>
      //         <p className="company-foundedDate">Founded:{this.state.user.foundedDate}</p>
      //         <p>
      //           Website:{' '}
      //           <a href={`${this.state.user.websiteUrl}`} target="_blank" rel="noopener noreferrer">
      //             {this.state.user.websiteUrl}
      //           </a>
      //         </p>
      //         <p>Size: {this.state.user.sizeInEmployees} employees</p>
      //       </div>
      //       <h3>Summary</h3>
      //       <p>{this.state.user.summary}</p>
      //       <h2>Job Posts</h2>
      //       {/* map through JSON with all the jobPosts created by the user */}

      //       <ul>
      //         {this.state.jobPosts.map(post => (
      //           <li key={post._id}>
      //             <Link to={`/jobpost/${post._id}`}>
      //               <h2>{post.title}</h2>
      //             </Link>
      //           </li>
      //         ))}
      //       </ul>
      //     </>
      //   )) || <h2>Loading...</h2>}
      // </div>
    );
  }
}

export default PublicProfile;
