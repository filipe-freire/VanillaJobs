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
        console.log(allUsers);

        this.setState({
          allUsers
        });
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
              <li key={user._id}>
                <Link to={`/profile/${user._id}`}>
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
