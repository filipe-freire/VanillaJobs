import React, { Component } from 'react';

import { postJob } from './../../services/jobPosts';

import './job-post-form.scss';

class Creation extends Component {
  constructor() {
    super();
    this.state = {
      creator: '',
      title: '',
      location: '',
      description: '',
      tasks: [],
      requirements: [],
      seniority: '',
      tech: [],
      category: ''
    };
  }

  handleFormSubmission = e => {
    e.preventDefault();
    const {
      creator,
      title,
      location,
      description,
      tasks,
      requirements,
      seniority,
      tech,
      category
    } = this.state;

    const body = {
      creator,
      title,
      location,
      description,
      tasks,
      requirements,
      seniority,
      tech,
      category
    };
    postJob(body)
      .then(data => {
        console.log(data.post);
        this.props.history.push(`/profile/${data.post.creator}`);
      })
      .catch(error => console.log(error));
  };

  handleUserInput = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleUserSelectInput = e => {
    const content = e.target.innerHTML;
    console.log(content);
    this.setState({
      category: content
    });
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmission}>
        <div>
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            id="title"
            placeholder="Job Title"
            name="title"
            value={this.state.title}
            onChange={this.handleUserInput}
          />
        </div>
        <div className="Select-input">
          <label htmlFor="category">Category</label>
          <input
            type=""
            id="category"
            placeholder="Category"
            name="category"
            value={this.state.category}
            // onChange={this.handleUserSelectInput}
          />
          <div className="buttons-group d-flex justify-content-between mt-1">
            <button
              type="button"
              onClick={this.handleUserSelectInput}
              className="btn"
            >
              Front end
            </button>
            <button
              type="button"
              onClick={this.handleUserSelectInput}
              className="btn"
            >
              Back end
            </button>
            <button
              type="button"
              onClick={this.handleUserSelectInput}
              className="btn"
            >
              Fullstack
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="location">Job Location</label>
          <input
            type="text"
            id="location"
            placeholder="Job Location"
            name="location"
            value={this.state.location}
            onChange={this.handleUserInput}
          />
        </div>
        <div>
          <label htmlFor="description">Job Description</label>
          <input
            type="text"
            id="description"
            placeholder="Job Description"
            name="description"
            value={this.state.description}
            onChange={this.handleUserInput}
          />{' '}
        </div>
        <div>
          <label htmlFor="tasks">Tasks</label>
          <input
            type="text"
            id="tasks"
            placeholder="Tasks"
            name="tasks"
            value={this.state.tasks}
            onChange={this.handleUserInput}
          />
        </div>
        <div>
          <label htmlFor="requirements">Requirements</label>
          <input
            type="text"
            id="requirements"
            placeholder="requirements"
            name="requirements"
            value={this.state.requirements}
            onChange={this.handleUserInput}
          />
        </div>
        <div>
          <label htmlFor="seniority">Seniority</label>
          <input
            type="text"
            id="seniority"
            placeholder="Seniority"
            name="seniority"
            value={this.state.seniority}
            onChange={this.handleUserInput}
          />
        </div>
        <div>
          <label htmlFor="tech">Tech</label>
          <input
            type="text"
            id="tech"
            placeholder="Tech"
            name="tech"
            value={this.state.tech}
            onChange={this.handleUserInput}
          />
        </div>
        <button className="btn ">Create</button>
      </form>
    );
  }
}

export default Creation;
