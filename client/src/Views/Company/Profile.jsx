import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  render() {
    return (
      <div>
        {(this.props.user && (
          <>
            <img src="" alt="" />
            <h1>Company Name: {this.props.user.companyName} </h1>
            <h3>Location: {this.props.user.location}</h3>
            <h5>Founded:</h5>
            <h5>Website: </h5>
            <h5>Size: __ employees</h5>

            <h3>Summary</h3>

            <h2>Job Posts</h2>
            <Link to={`/profile/${this.props.match.params.id}/edit`}>Edit Profile</Link>
          </>
        )) || <h2>Loading...</h2>}
      </div>
    );
  }
}

export default Profile;
