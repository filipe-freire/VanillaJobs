import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadUser } from '../../services/company';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      user: '',
      photo: ''
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    loadUser(id)
      .then(data => {
        const user = data.user;
        this.setState({
          loaded: true,
          user
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const user = this.state.user;
    return (
      <div>
        {(this.state.loaded && (
          <>
            <img src="" alt="" />
            <h1>Company Name: {user.companyName} </h1>
            <h3>Location: {user.location} </h3>
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
