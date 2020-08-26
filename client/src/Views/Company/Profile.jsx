import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadUser } from './../../services/company';
import { loadAllByCreatorId } from '../../services/jobPosts';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      photo: null,
      jobPosts: []
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
      <div>
        {(this.state.user && (
          <>
            <img
              src={this.state.user.logo}
              alt={`${this.state.user.companyName}'s logo`}
              style={{ maxWidth: '150px', maxHeight: '150px' }}
            />
            <h1>Company Name: {this.state.user.companyName} </h1>
            <h3>Location: {this.state.user.location}</h3>
            <h5>Founded:{this.state.user.foundedDate}</h5>
            <h5>Website: {this.state.user.websiteUrl}</h5>
            <h5>Size: {this.state.user.sizeInEmployees} employees</h5>

            <h3>Summary</h3>
            <p>{this.state.user.summary}</p>
            <h2>Job Posts</h2>
            {/* map through JSON with all the jobPosts created by the user */}
            {(this.state.jobPosts[0] && (
              <ul>
                {this.state.jobPosts.map(post => (
                  <li key={post._id}>
                    <Link to={`/jobpost/${post._id}`}>
                      <h2>{post.title}</h2>
                    </Link>
                  </li>
                ))}
              </ul>
            )) || <p>No Job Posts Available </p>}

            <Link to={`/profile/${this.props.match.params.id}/edit`}>Edit Profile</Link>
          </>
        )) || <h2>Loading...</h2>}
      </div>
    );
  }
}

export default Profile;
