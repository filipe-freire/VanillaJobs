import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { loadAll } from './../../services/jobPosts';

import './style.scss';

class Homepage extends Component {
  constructor() {
    super();

    this.state = {
      loaded: false,
      jobPosts: [],
      contentSearch: ''
    };
  }

  componentDidMount() {
    loadAll().then(data => {
      const { jobPosts } = data;
      this.setState({
        loaded: true,
        jobPosts
      });
    });
  }

  render() {
    return (
      <div className="Homepage pt-5">
        <div className="Homepage-header pt-3">
          <h1 className="pb-3">Designed to make your job easier</h1>
        </div>
        <form className="d-flex flex-row overflow-hidden py-2">
          <img
            src="https://res.cloudinary.com/dtty9rclm/image/upload/v1598377654/Project%203%20images/procurar_1_aml9yp.png"
            alt="search-img"
            className="col-1 p-0 ml-3"
          />
          <input
            type="text"
            value={this.state.contentSearch}
            onChange={this.handleSearchInput}
            className="col-11 p-0 ml-4 "
            placeholder="Search"
          />
        </form>

        <div className="Job-offers-container">
          <h3 className="text-left">Front end</h3>
        </div>

        <ul>
          {this.state.loaded &&
            this.state.jobPosts.map(value => {
              return (
                <li key={value._id}>
                  <Link key={value._id} to={`/jobpost/${value._id}`}>
                    {value.title}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

export default Homepage;
