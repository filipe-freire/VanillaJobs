import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadJob, deleteJob } from './../../services/jobPosts';
import { loadMe } from '../../services/authentication';

import Button from './../../components/Button';

import './styles/job-post-single.scss';

class SingleView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      post: null,
      user: ''
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
      if (user === null) {
        this.setState({ user: '' });
      } else this.setState({ user });
    });
  }

  handlePostDeletion = e => {
    e.preventDefault();
    const id = this.props.match.params.id;
    deleteJob(id).then(() => {
      this.props.history.push(`/profile/${this.state.user._id}`);
    });
  };

  render() {
    const post = this.state.post;
    //console.log(post);
    //console.log(this.props);
    //console.log(this.state.user._id);
    return (
      <div className="jobpost-container mx-auto">
        {this.state.loaded && (
          <>
            <section className="header-container d-flex col-12 p-0 my-5 ">
              <div className="d-flex flex-column col-7">
                <img
                  src={post.creator.logo}
                  alt={`${post.creator.companyName} 's logo`}
                  style={{ width: '4.5rem', borderRadius: '1rem' }}
                />
                <h2 className="text-left mt-4 mb-3">{post.title}</h2>
                <p className="text-left mt-1">
                  <span>Company:</span>{' '}
                  <Link
                    to={
                      (this.state.user && `/profile/${post.creator._id}`) ||
                      `/public/profile/${post.creator._id}`
                    }
                  >
                    {post.creator.companyName}
                  </Link>
                </p>
                <p className="text-left mt-1">
                  <span>Location:</span> {post.location}
                </p>
                <p className="text-left mt-1">
                  <span>Seniority:</span> {post.seniority}
                </p>
              </div>
              <div className="col-5 d-flex justify-content-center align-items-center">
                {this.state.user._id === this.state.post.creator._id && (
                  <form onSubmit={this.handlePostDeletion}>
                    <Button name="Delete" />
                  </form>
                )}
                {!this.state.user && (
                  <Link
                    to={`/jobpost/${this.props.match.params.id}/application`}
                    className=" p-2 apply-link"
                  >
                    Apply to Job
                  </Link>
                )}
              </div>
            </section>
            {/* <p>
              <span style={{ fontWeight: 'bold' }}>Category: </span>
              {post.category}
            </p> */}
            <div className="d-flex flex-column justify-content-start my-3">
              <h3 className="text-left">Requirements</h3>
              <p className="text-left">{post.requirements[0]}</p>
            </div>
            <div className="d-flex flex-column justify-content-start my-3">
              <h3 className="text-left">Job description</h3>
              <p className="text-left">{post.description}</p>
            </div>
            <div className="d-flex flex-column justify-content-start my-3">
              <h3 className="text-left">Tech</h3>
              <div className="d-flex tech-items">
                {post.tech.map(value => (
                  <p key={value} className="py-1 px-3 mr-2 flex-wrap text-left">
                    {value}
                  </p>
                ))}
              </div>
            </div>
            <div className="d-flex flex-column justify-content-start my-3">
              <h3 className="text-left">Tasks</h3>
              {post.tasks.map(item => (
                <p key={item} className="text-left">
                  {item}
                </p>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default SingleView;
