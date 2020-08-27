import React, { Component } from 'react';

import { postJob } from './../../services/jobPosts';
import { loadMe } from './../../services/authentication';
import InputCheckbox from '../../components/InputCheckbox';
import InputText from './../../components/InputText';

import './styles/job-post-text-inputs.scss';
import './styles/job-post-radio.scss';

class Creation extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
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

  componentDidMount() {
    loadMe()
      .then(data => {
        const user = data.user;

        this.handleUserUpdate(user);

        this.setState({
          loaded: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleUserUpdate = user => {
    this.setState({
      user
    });
  };

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
                color={(this.state.category === item && '#5f49e7') || '#cacaca'}
                key={item}
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
                key={item}
                color={this.state.tech.includes(item) && '#5f49e7'}
              />
            ))}
          </div>
        </div>
        <button className="btn">Create</button>
      </form>
    );
  }
}

export default Creation;
