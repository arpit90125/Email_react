import React, { Component } from 'react';
export class Page2 extends Component {
  state = {
    email: null
  }
  render = () => {
    return <div>
      <h1> Page2 </h1>
      email: <input width="100" value={this.props.email} onChange={this.props.onEmailChanged} />
      </div>
  }
}