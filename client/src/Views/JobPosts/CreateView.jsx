import React, { Component } from 'react';

import { postJob } from './../../services/jobPosts';
import InputCheckbox from '../../components/InputCheckbox';
import InputText from './../../components/InputText';

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
    console.log(this.state)

    //input select types
    const selectType = [
      {name: 'category', type: 'radio', items: ['Frontend', 'Backend', 'Fullstack']},
      {name: 'seniority', type: 'radio', items: ['Junior', 'Mid', 'Senior']},
      {name: 'tech', type: 'checkbox', items: ['React', 'NodeJS', 'Javascript', 'VueJS']}
    ]

    // //input text types
    // const textLabelsList = [
    //   "Job Title",
    //   "Job Location",
    //   "Job Description",
    //   "Tasks",
    //   "Requirements"
    // ];

    return (
      <form onSubmit={this.handleFormSubmission} className="py-4">
        <InputText
          id="title"
          value={this.state.title}
          handleChange={this.handleUserInput}
          label="Job Title"
        />
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

        {selectType.map((label, index)=> (
          <div key={index} className="select-input">
            <p className="text-left">{label.name[0].toUpperCase() + label.name.slice(1)}</p>
            <div className="d-flex d-flex justify-content-start flex-wrap">
              {label.items.map((item, index) => (
                <InputCheckbox
                  type={label.type}
                  name={label.name}
                  id={item.toLowerCase()}
                  value={item}
                  handleChange={label.type === 'checkbox' ? this.handleUserCheckInput: this.handleUserSelectInput}
                  key={index}
                  color={this.state[label.name].includes(item) && '#5f49e7'}
                />
              ))}
            </div>
          </div>
        ))}
        <button className="btn">Create</button>
      </form>
    );
  }
}

export default Creation;
