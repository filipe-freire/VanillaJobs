import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadAllUsers } from '../../services/company';
import './styles/listAllCompanies.scss';

class AllCompanies extends Component {
  constructor() {
    super();
    this.state = {
      allUsers: null
    };
  }

  componentDidMount() {
    loadAllUsers()
      .then(data => {
        const { allUsers } = data;

        this.setState({
          allUsers
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="list-companies-view">
        <h1>Company Listing</h1>
        {(this.state.allUsers && (
          <ul>
            {this.state.allUsers.map(user => (
              <li key={user._id}>
                <div className="card">
                  <img src={user.logo} className="card-img-top" alt="" />
                  <div className="card-body">
                    <h5 className="card-title">{user.companyName}</h5>
                    <p className="card-text"> "{user.summary}" </p>
                    <Link className="btn btn-primary bg-info" to={`/public/profile/${user._id}`}>
                      <p>See Profile </p>
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )) || <h2>Loading ...</h2>}
      </div>
    );
  }
}

export default AllCompanies;
