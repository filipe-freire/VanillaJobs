import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { loadJob, editJob } from './../../services/jobPosts';

import InputCheckbox from '../../components/InputCheckbox';
import InputText from './../../components/InputText';

import './styles/job-post-text-inputs.scss';
import './styles/job-post-radio.scss';

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

  handleFormSubmission = e => {
    e.preventDefault();
    const id = this.props.match.params.id;

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
    editJob(id, body)
      .then(data => {
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
        } = data.post;

        this.setState({
          creator,
          title,
          location,
          description,
          tasks,
          requirements,
          seniority,
          tech,
          category
        });
      })
      .then(() => {
        this.props.history.push(`/jobPost/${id}`);
      });
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    loadJob(id).then(data => {
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
      } = data.post;
      console.log(data);
      this.setState({
        creator,
        title,
        location,
        description,
        tasks,
        requirements,
        seniority,
        tech,
        category
      });
    });
  }

  handleUserSelectInput = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tech !== this.state.tech) {
    }
  }

  handleUserCheckInput = e => {
    const { value } = e.target;
    const tech = [...this.state.tech];
    if (!tech.includes(value)) {
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
    const techEls = ['React', 'NodeJS', 'Javascript', 'VueJS'];
    const seniorityLevels = ['Junior', 'Mid', 'Senior'];
    const categories = ['Frontend', 'Backend', 'Fullstack'];
    return (
      <form onSubmit={this.handleFormSubmission} className="py-4">
        <InputText
          id="title"
          value={this.state.title}
          handleChange={this.handleUserInput}
          label="Job Title"
        />

        <div className="select-input">
          <p className="text-left">Category</p>
          <div className="d-flex justify-content-start ">
            {categories.map(item => (
              <InputCheckbox
                type="radio"
                id={item.toLowerCase()}
                value={item}
                name="category"
                handleChange={this.handleUserSelectInput}
                key={item}
                color={(this.state.category === item && '#5f49e7') || '#cacaca'}
              />
            ))}
          </div>
        </div>
        <InputText
          id="location"
          value={this.state.location}
          handleChange={this.handleUserInput}
          label="Job Location"
        />
        <InputText
          id="description"
          value={this.state.description}
          handleChange={this.handleUserInput}
          label="Job Description"
        />
        <InputText
          id="tasks"
          value={this.state.tasks}
          handleChange={this.handleUserInput}
          label="Tasks"
        />
        <InputText
          id="requirements"
          value={this.state.requirements}
          handleChange={this.handleUserInput}
          label="Requirements"
        />

        <div className="select-input">
          <p className="text-left">Seniority</p>
          <div className="d-flex justify-content-start">
            {seniorityLevels.map(item => (
              <InputCheckbox
                type="radio"
                id={item.toLowerCase()}
                name="seniority"
                value={item}
                handleChange={this.handleUserSelectInput}
                color={this.state.seniority === item && '#5f49e7'}
                key={item}
              />
            ))}
          </div>
        </div>

        <div className="select-input">
          <p className="text-left">Tech</p>
          <div className="d-flex d-flex justify-content-start flex-wrap">
            {techEls.map(item => (
              <InputCheckbox
                type="checkbox"
                name="tech"
                id={item.toLowerCase()}
                value={item}
                handleChange={this.handleUserCheckInput}
                color={this.state.tech.includes(item) && '#5f49e7'}
                key={item}
              />
            ))}
          </div>
        </div>

        <button className="btn ">Update</button>
      </form>
    );
  }
}

export default EditView;
