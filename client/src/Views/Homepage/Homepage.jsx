import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { loadAll } from './../../services/jobPosts';

class Homepage extends Component {
  constructor() {
    super();

    this.state = {
      loaded: false,
      jobPosts: []
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
      <div>
        <h1>Vanilla Jobs - Homepage</h1>
        {this.state.loaded &&
          this.state.jobPosts.map(value => {
            return (
              <Link key={value._id} to={`/jobpost/${value._id}`}>
                {value.title}
              </Link>
            );
          })}
      </div>
    );
  }
}

export default Homepage;
