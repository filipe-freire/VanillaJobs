import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const Navbar = props => {
  return (
    <nav>
      <Link to="/">Vanilla Jobs</Link>
      <Link to="/jobpost/create">Create a Job Post</Link>
      {(props.user && (
        <>
          <span>{props.user.companyName}</span>
          <button onClick={props.onSignOut}>Sign Out</button>
        </>
      )) || (
        <>
          <Link to="/authentication/sign-up">Sign Up</Link>
          <Link to="/authentication/sign-in">Sign In</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
