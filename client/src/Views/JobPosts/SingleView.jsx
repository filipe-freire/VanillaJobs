import React, { Component } from 'react';

import { loadJob } from './../../services/jobPosts';

class SingleView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      post: null
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    loadJob(id).then(data => {
      const { post } = data;
      console.log(post);

      this.setState({
        loaded: true,
        post
      });
    });
  }

  render() {
    const post = this.state.post;
    console.log(post);
    return (
      <div>
        <h1>Single view</h1>
        {this.state.loaded && (
          <>
            <h4>{post.title}</h4>
            <p>{post.location}</p>
            <p>{post.seniority}</p>
            <p>{post.tasks[0]}</p>
            <p>{post.requirements[0]}</p>
            <p>{post.tech}</p>
          </>
        )}
      </div>
    );
  }
}

export default SingleView;
