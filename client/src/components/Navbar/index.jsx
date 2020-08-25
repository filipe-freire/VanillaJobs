import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './hamburger.css';
import './style.scss';

class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      menuToggled: false
    };
  }

  toggleMenu = () => {
    this.setState({
      menuToggled: !this.state.menuToggled
    });
  };

  render() {
    return (
      <div>
        <nav>
          <Link to="/" className="logo-link">
            <img
              src="https://res.cloudinary.com/dtty9rclm/image/upload/v1598376231/Project%203%20images/vanilla-logo_gismhr.svg"
              alt="Vanilla jobs logo"
              className="vanilla-logo"
            ></img>
            <h3>Vanilla Jobs</h3>
          </Link>
          <button
            className={
              (this.state.menuToggled &&
                'hamburger hamburger--squeeze is-active') ||
              'hamburger hamburger--squeeze'
            }
            type="button"
            onClick={this.toggleMenu}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </nav>
        {this.state.menuToggled && (
          <div className="menu-layer-dar" onClick={this.toggleMenu}></div>
        )}
        {this.state.menuToggled && (
          <div className="menu">
            {(this.props.user && (
              <>
                <Link to="/jobpost/create">Create a Job Post</Link>
                <Link to={`/profile/${this.props.user._id}`}>
                  {' '}
                  {`${this.props.user.companyName}'s Profile`}{' '}
                </Link>
                <Link onClick={this.props.onSignOut}>Sign Out</Link>
              </>
            )) || (
              <>
                <Link to="/authentication/sign-up" onClick={this.toggleMenu}>
                  Sign Up
                </Link>
                <Link to="/authentication/sign-in" onClick={this.toggleMenu}>
                  Sign In
                </Link>
                <Link to="/listCompanies" onClick={this.toggleMenu}>
                  Companies
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Navbar;
