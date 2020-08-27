import React, { Component } from 'react';

import { loadUser, editUser } from '../../services/company';

class ProfileEditView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      user: null
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    loadUser(id)
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
    const {
      companyName,
      email,
      logo,
      location,
      foundedDate,
      websiteUrl,
      sizeInEmployees,
      summary
    } = this.state.user;
    const body = {
      companyName,
      email,
      logo,
      location,
      foundedDate,
      websiteUrl,
      sizeInEmployees,
      summary
    };
    editUser(id, body)
      .then(() => {
        this.props.history.push(`/profile/${id}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleCompanyInfoChange = event => {
    const { name, value } = event.target;

    this.setState({
      user: { ...this.state.user, [name]: value }
    });
  };

  handleLogoInputChange = event => {
    const file = event.target.files[0];
    console.log(file);

    this.setState({
      user: { ...this.state.user, logo: file }
    });
  };

  render() {
    const user = this.state.user;
    return (
      <div>
        <h1>Profile Edit</h1>
        {(this.state.loaded && (
          <>
            <form onSubmit={this.handleUserEdit}>
              <label htmlFor="input-companyName">Company Name</label>
              <input
                id="input-companyName"
                type="text"
                name="companyName"
                placeholder="Company name"
                value={user.companyName || ''}
                onChange={this.handleCompanyInfoChange}
                required
              />

              <label htmlFor="input-email">Email</label>
              <input
                id="input-email"
                type="email"
                name="email"
                placeholder="company@example.com"
                value={user.email || ''}
                onChange={this.handleCompanyInfoChange}
                required
              />

              <label htmlFor="input-logo">Company Logo</label>
              <input
                id="input-logo"
                type="file"
                name="logo"
                onChange={this.handleLogoInputChange}
              />

              <label htmlFor="input-location">Company Location</label>
              <input
                id="input-location"
                type="text"
                name="location"
                placeholder="Paris"
                value={user.location || ''}
                onChange={this.handleCompanyInfoChange}
                required
              />

              <label htmlFor="input-foundedDate">Founded:</label>
              <input
                id="input-foundedDate"
                type="text"
                name="foundedDate"
                placeholder="dd/mm/yyyy"
                value={user.foundedDate || ''}
                onChange={this.handleCompanyInfoChange}
                required
              />

              <label htmlFor="input-websiteUrl">Website</label>
              <input
                id="input-websiteUrl"
                type="text"
                name="websiteUrl"
                placeholder="https://www.company.example"
                value={user.websiteUrl || ''}
                onChange={this.handleCompanyInfoChange}
                required
              />

              <label htmlFor="input-sizeInEmployees">Size:</label>
              <input
                id="input-sizeInEmployees"
                type="text"
                name="sizeInEmployees"
                placeholder="400 employees"
                value={user.sizeInEmployees || ''}
                onChange={this.handleCompanyInfoChange}
                required
              />

              <label htmlFor="input-summary">Summary:</label>
              <textarea
                id="input-summary"
                type="text"
                name="summary"
                placeholder="Summary"
                value={user.summary || ''}
                onChange={this.handleCompanyInfoChange}
                required
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
