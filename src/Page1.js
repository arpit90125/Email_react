// we will demonstrate loss of state
// when items go out of virtual DOM
import React, { Component } from 'react';
export class Page1 extends Component {
  state = {
    username: null
  }
  render = () => {
    return <div>
      <h1> Page1 </h1>
      username: <input width="100" value={this.props.username} onChange={this.props.onUsernameChanged} />
      </div>
  }
}