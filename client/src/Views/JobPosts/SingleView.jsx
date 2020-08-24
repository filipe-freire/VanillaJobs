import React, { Component } from 'react';

class SingleView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      post: null
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>Single view</h1>
      </div>
    );
  }
}

export default SingleView;
