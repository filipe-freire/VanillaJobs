import React, { Component } from 'react';

import { postJob } from './../../services/jobPosts';
import InputCheckbox from '../../components/InputCheckbox';
import Label from '../../components/Label';

import './styles/job-post-text-inputs.scss';
import './styles/job-post-radio.scss';

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
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleUserCheckInput = e => {
    const { value, checked } = e.target;
    const tech = [...this.state.tech];
    console.dir(e.target.checked);
    if (checked) {
      tech.push(value);
    } else {
      const index = tech.indexOf(value);
      tech.splice(index, 1);
    }

    this.setState({
      tech
    });
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmission} className="py-4">
        <div>
          <input
            type="text"
            id="title"
            name="title"
            value={this.state.title}
            onChange={this.handleUserInput}
            required
            autoComplete="off"
            className="input-text"
          />
          <label htmlFor="title" className="label-input-text">
            <span>Job Title</span>
          </label>
        </div>
        <div className="select-input">
          <p className="text-left">Category</p>
          <div className="d-flex justify-content-around">
            <input
              type="radio"
              id="frontend"
              name="category"
              value="Front end"
              onChange={this.handleUserSelectInput}
            />
            <label htmlFor="frontend" className="py-1 px-3">
              Front end
            </label>
            <input
              type="radio"
              id="backend"
              name="category"
              value="Back end"
              onChange={this.handleUserSelectInput}
            />
            <label htmlFor="backend" className="py-1 px-3">
              Back end
            </label>
            <input
              type="radio"
              id="fullstack"
              name="category"
              value="Fullstack"
              onChange={this.handleUserSelectInput}
            />
            <label htmlFor="fullstack" className="py-1 px-3">
              Fullstack
            </label>
          </div>
        </div>
        <div>
          <input
            type="text"
            id="location"
            name="location"
            value={this.state.location}
            onChange={this.handleUserInput}
            required
            autoComplete="off"
            className="input-text"
          />
          <label htmlFor="location" className="label-input-text">
            <span> Job Location</span>
          </label>
        </div>
        <div>
          <input
            type="text"
            id="description"
            required
            autoComplete="off"
            name="description"
            value={this.state.description}
            onChange={this.handleUserInput}
            className="input-text"
          />
          <label htmlFor="description" className="label-input-text">
            <span>Job Description</span>
          </label>
        </div>
        <div>
          <input
            type="text"
            id="tasks"
            name="tasks"
            value={this.state.tasks}
            onChange={this.handleUserInput}
            required
            autoComplete="off"
            className="input-text"
          />
          <label htmlFor="tasks" className="label-input-text">
            <span>Tasks</span>
          </label>
        </div>
        <div>
          <input
            type="text"
            id="requirements"
            name="requirements"
            value={this.state.requirements}
            onChange={this.handleUserInput}
            required
            autoComplete="off"
            className="input-text"
          />
          <label htmlFor="requirements" className="label-input-text">
            <span>Requirements</span>
          </label>
        </div>
        <div className="select-input">
          <p className="text-left">Seniority</p>
          <div className="d-flex justify-content-around">
            <input
              type="radio"
              id="junior"
              name="seniority"
              value="Junior"
              onChange={this.handleUserSelectInput}
            />
            <label htmlFor="junior" className="py-1 px-3">
              Junior
            </label>
            <input
              type="radio"
              id="Mid"
              name="seniority"
              value="Mid"
              onChange={this.handleUserSelectInput}
            />
            <label htmlFor="Mid" className="py-1 px-3">
              Mid
            </label>
            <input
              type="radio"
              id="Senior"
              name="seniority"
              value="Senior"
              onChange={this.handleUserSelectInput}
            />
            <label htmlFor="Senior" className="py-1 px-3">
              Senior
            </label>
          </div>
        </div>
        {/* Working on this */}
        <div className="select-input">
          <p className="text-left">Tech</p>
          <div className="d-flex d-flex justify-content-start flex-wrap">
            <InputCheckbox
              id="react"
              value="React"
              handleChange={this.handleUserCheckInput}
            />
            <Label forName="react" styles="py-1 px-3 mr-3" text="React" />
            <InputCheckbox
              id="nodeJS"
              value="NodeJS"
              handleChange={this.handleUserCheckInput}
            />
            <Label forName="nodeJS" styles="py-1 px-3  mr-3" text="NodeJS" />

            <InputCheckbox
              id="javascript"
              value="Javascript"
              handleChange={this.handleUserCheckInput}
            />
            <Label
              forName="javascript"
              styles="py-1 px-3  mr-3"
              text="Javascript"
            />

            <InputCheckbox
              id="vuejs"
              value="VueJS"
              handleChange={this.handleUserCheckInput}
            />
            <Label forName="vuejs" styles="py-1 px-3 mr-3" text="VueJS" />
          </div>
        </div>
        {/* Wnf od current working stage */}
        <button className="btn ">Create</button>
      </form>
    );
  }
}

export default Creation;
