import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
class App extends Component {
  state = {
    x: null,
    y: null,
    sum: null,
    diff: null
  }
  handleXChange = (e) => {
    this.setState({ x: e.target.value });
  }
  handleYChange = (e) => {
    this.setState({ y: e.target.value });
  }
  handleSumChange = (e) => {
    this.setState({ sum: Number(this.state.x) + Number(this.state.y),
                    diff: null   })
  }
  handleSubChange = (e) => {
    this.setState({ diff: Number(this.state.x) - Number(this.state.y) ,
                    sum : null })
  }
  result = ()=>{
    if(this.state.diff !== null){
      return <p>Difference is : {this.state.diff}</p>
    }
    else if(this.state.sum !== null){
      return <p>Sum is : {this.state.sum}</p>
    }
    else
      return null;
  }
  render = () => {
    const { x, y } = this.state;
    return (
      <div>
        x : <input type="Number" id="x" onChange={this.handleXChange} /><br />
      y : <input type="Number" id="y" onChange={this.handleYChange} /><br />
        <button onClick={this.handleSumChange}>+</button><br />
        <button onClick={this.handleSubChange}>-</button><br />
        {this.state.diff !== null  && <p>Difference is : {this.state.diff}</p>}
        {this.state.sum !== null && <p>Sum is : {this.state.sum}</p>}
      <br/>
      </div>
    );
  }
}
export default App;