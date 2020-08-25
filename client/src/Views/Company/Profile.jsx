import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadUser } from './../../services/company';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    loadUser(id).then(data => {
      const { user } = data;

      this.setState({ user });
    });
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
            <Link to={`/profile/${this.props.match.params.id}/edit`}>Edit Profile</Link>
          </>
        )) || <h2>Loading...</h2>}
      </div>
    );
  }
}

export default Profile;
