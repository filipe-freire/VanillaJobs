import React, { Component } from 'react';
import { loadMe } from '../../services/authentication';
import { editUser } from '../../services/company';

class ProfileEditView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      user: '',
      photo: null
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    loadMe(id)
      .then(data => {
        const user = data.user;
        this.setState({
          loaded: true,
          user
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleUserEdit = event => {
    event.preventDefault();
    const id = this.props.match.params.id;

    const user = this.state.user;
    const photo = this.state.photo;
    const body = { user, photo };

    editUser(id, body)
      .then(data => {
        this.props.history.push(`/profile/${id}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleCompanyInfoChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      user: {
        [name]: value
      }
    });
  };

  render() {
    const user = this.state.user;
    return (
      <div>
        <h1>Profile Edit View</h1>
        {(this.state.loaded && (
          <>
            <form onSubmit={this.handleUserEdit}>
              <label htmlFor="input-companyName">Company Name</label>
              <input
                id="input-companyName"
                type="text"
                name="companyName"
                placeholder="Company name"
                value={user.companyName}
                onChange={this.handleCompanyInfoChange}
              />

              <label htmlFor="input-email">Email</label>
              <input
                id="input-email"
                type="email"
                name="email"
                placeholder="company@example.com"
                value={user.email}
                onChange={this.handleCompanyInfoChange}
              />

              <label htmlFor="input-location">Company Location</label>
              <input
                id="input-location"
                type="text"
                name="location"
                placeholder="Paris"
                value={user.location}
                onChange={this.handleCompanyInfoChange}
              />

              <label htmlFor="input-foundedDate">Founded:</label>
              <input
                id="input-foundedDate"
                type="text"
                name="foundedDate"
                placeholder="dd/mm/yyyy"
                value={user.foundedDate}
                onChange={this.handleCompanyInfoChange}
              />

              <label htmlFor="input-websiteUrl">Website</label>
              <input
                id="input-websiteUrl"
                type="text"
                name="websiteUrl"
                placeholder="company.example"
                value={user.websiteUrl}
                onChange={this.handleCompanyInfoChange}
              />

              <label htmlFor="input-sizeInEmployees">Size:</label>
              <input
                id="input-sizeInEmployees"
                type="text"
                name="sizeInEmployees"
                placeholder="400 employees"
                value={user.sizeInEmployees}
                onChange={this.handleCompanyInfoChange}
              />

              <label htmlFor="input-summary">Summary:</label>
              <textarea
                id="input-summary"
                type="text"
                name="summary"
                placeholder="Summary"
                value={user.summary}
                onChange={this.handleCompanyInfoChange}
              />
              <button>Submit</button>
            </form>
          </>
        )) || <h2>Loading...</h2>}
      </div>
    );
  }
}

export default ProfileEditView;
