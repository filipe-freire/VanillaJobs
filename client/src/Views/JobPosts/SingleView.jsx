import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadJob, deleteJob } from './../../services/jobPosts';
import { loadMe } from '../../services/authentication';

class SingleView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      post: null,
      user: null
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    loadJob(id)
      .then(data => {
        const { post } = data;

        this.setState({
          loaded: true,
          post
        });
      })
      .catch(error => console.log(error));

    loadMe().then(data => {
      const { user } = data;

      this.setState({ user });
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
            <h4>Title: {post.title}</h4>
            <p>
              <span style={{ fontWeight: 'bold' }}>Location:</span> {post.location}
            </p>
            <p>
              <span style={{ fontWeight: 'bold' }}>Category:</span> {post.category}
            </p>
            <p>
              <span style={{ fontWeight: 'bold' }}>Seniority Level:</span> {post.seniority}
            </p>
            <p>
              <span style={{ fontWeight: 'bold' }}>Tasks:</span> {post.tasks[0]}
            </p>
            <p>
              <span style={{ fontWeight: 'bold' }}>Requirements:</span> {post.requirements[0]}
            </p>
            <p>
              <span style={{ fontWeight: 'bold' }}>Tech Used:</span> {post.tech}
            </p>
            {this.state.user && (
              <form onSubmit={this.handlePostDeletion}>
                <button>Delete</button>
              </form>
            )}
            {!this.state.user && (
              <Link to={`/jobpost/${this.props.match.params.id}/application`}>Apply to Job</Link>
            )}
          </>
        )}
      </div>
    );
  }
}

export default SingleView;
