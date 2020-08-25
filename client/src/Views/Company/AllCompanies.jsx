import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadAllUsers } from '../../services/company';

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
        this.setState = {
          allUsers
        };
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <h1>Company List</h1>
        {(this.state.allUsers && (
          <ul>
            {this.state.allUsers.map(user => (
              <li>
                <Link>
                  <h1>{user.companyName} </h1>
                </Link>
              </li>
            ))}
          </ul>
        )) || <h2>Loading ...</h2>}
      </div>
    );
  }
}

export default AllCompanies;
