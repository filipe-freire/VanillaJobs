import React, { Component } from 'react';

class EditView extends Component {
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
      tech: []
    };
  }

  handleUserInput = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmission}>
        <label htmlFor="title">Job Title</label>
        <input
          type="text"
          id="title"
          placeholder="Job Title"
          name="title"
          value={this.state.title}
          onChange={this.handleUserInput}
        />
        <label htmlFor="location">Job Location</label>
        <input
          type="text"
          id="location"
          placeholder="Job Location"
          name="location"
          value={this.state.location}
          onChange={this.handleUserInput}
        />
        <label htmlFor="description">Job Description</label>
        <input
          type="text"
          id="description"
          placeholder="Job Description"
          name="description"
          value={this.state.description}
          onChange={this.handleUserInput}
        />
        <label htmlFor="tasks">Tasks</label>
        <input
          type="text"
          id="tasks"
          placeholder="Tasks"
          name="tasks"
          value={this.state.tasks}
          onChange={this.handleUserInput}
        />
        <label htmlFor="requirements">Requirements</label>
        <input
          type="text"
          id="requirements"
          placeholder="requirements"
          name="requirements"
          value={this.state.requirements}
          onChange={this.handleUserInput}
        />
        <label htmlFor="seniority">Seniority</label>
        <input
          type="text"
          id="seniority"
          placeholder="Seniority"
          name="seniority"
          value={this.state.seniority}
          onChange={this.handleUserInput}
        />
        <label htmlFor="tech">Tech</label>
        <input
          type="text"
          id="tech"
          placeholder="Tech"
          name="tech"
          value={this.state.tech}
          onChange={this.handleUserInput}
        />
        <button>Create</button>
      </form>
    );
  }
}

export default EditView;