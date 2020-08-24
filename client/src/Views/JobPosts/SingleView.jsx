import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadJob, deleteJob } from './../../services/jobPosts';

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

      this.setState({
        loaded: true,
        post
      });
    });
  }

  handlePostDeletion = e => {
    e.preventDefault();
    const id = this.props.match.params.id;
    deleteJob(id).then(() => {
      this.props.history.push('/');
    });
  };

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
            <form onSubmit={this.handlePostDeletion}>
              <button>Delete</button>
            </form>
            <Link to={`/jobpost/${this.props.match.params.id}/application`}>Apply to Job</Link>
          </>
        )}
      </div>
    );
  }
}

export default SingleView;
