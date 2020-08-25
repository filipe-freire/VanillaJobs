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

        <div className="Job-offers-container mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h3 className="text-left m-0 ">Front end</h3>
            </div>
            <Link className="m-0" to="#">
              More →
            </Link>
          </div>
          {this.state.loaded &&
            this.state.jobPosts.map(value => {
              return (
                <Link
                  className="Job-post d-flex p-2 my-2"
                  key={value._id}
                  to={`/jobpost/${value._id}`}
                >
                  <img src={value.creator.logo} alt="company logo" />
                  <div className="d-flex flex-column justify-content-between align-items-start ml-4">
                    <h5 className="m-0">{value.title}</h5>
                    <p className="m-0">{value.creator.companyName}</p>
                    <p className="m-0">
                      {value.seniority} | {value.creator.location}
                    </p>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Homepage;
