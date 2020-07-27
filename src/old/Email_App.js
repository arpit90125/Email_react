// we will demonstrate loss of state
// when items go out of virtual DOM
import React, { Component } from 'react';
import { Page1 } from './Page1';
import { Page2 } from './Page2';
export class App extends Component {
  state = {
    pageNumber: 1,
  }
  render = () => {
    return <div>
      <button onClick={(e) => this.setState({ pageNumber: 1 })}>Page 1</button>
      <button onClick={(e) => this.setState({ pageNumber: 2 })}>Page 2</button>
      {this.state.pageNumber === 1 && <Page1 username={this.state.username} onUsernameChanged={(e) => this.setState({ username: e.target.value })} />}
      {this.state.pageNumber === 2 && <Page2 email={this.state.email} onEmailChanged={(e) => this.setState({ email: e.target.value })} />}
    </div>
  }
}
export default App;