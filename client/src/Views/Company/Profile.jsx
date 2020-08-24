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
      console.log(data);
      const { user } = data;

      this.setState({ user });
    });
  }

  render() {
    console.log('this is the state', this.state);
    return (
      <div>
        {(this.state.user && (
          <>
            <img src="" alt="" />
            <h1>Company Name: {this.state.user.companyName} </h1>
            <h3>Location: {this.state.user.location}</h3>
            <h5>Founded:</h5>
            <h5>Website: </h5>
            <h5>Size: __ employees</h5>

            <h3>Summary</h3>

            <h2>Job Posts</h2>
            <Link to={`/profile/${this.props.match.params.id}/edit`}>
              Edit Profile
            </Link>
          </>
        )) || <h2>Loading...</h2>}
      </div>
    );
  }
}

export default Profile;
