import React from 'react';
import { Link } from 'react-router-dom';

const Profile = props => {
  //console.log(props.user);
  return (
    <div>
      {(props.user && (
        <>
          <img src="" alt="" />
          <h1>Company Name: {props.user.companyName} </h1>
          <h3>Location: </h3>
          <h5>Founded:</h5>
          <h5>Website: </h5>
          <h5>Size: __ employees</h5>

          <h3>Summary</h3>

          <h2>Job Posts</h2>
          <Link to={`/profile/${props.match.params.id}/edit`}>
            Edit Profile
          </Link>
        </>
      )) || <h2>Loading...</h2>}
    </div>
  );
};

export default Profile;
