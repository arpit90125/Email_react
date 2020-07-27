import React, { Component } from 'react';
import faker from 'faker';
import store from './store';
import Inbox from './Inbox';
import { Provider, connect } from 'react-redux';
import './App.css';
// arrow functions
import EmailComponent from './Email';
import EmailList from './EmailList';
import Login from './Login';

let a = Array.from(Array(100), (_, i) => i + 1);

// the mock data has fake email ids just for fun.
const inboxEmails = a.map(n => ({
  from: faker.internet.email(),
  to: 'me',
  subject: `subject ${n}`,
  message: `message ${n}`,
}));
window.inboxEmails = inboxEmails;
const sentEmails = a.map(n => ({
  from: 'me',
  to: faker.internet.email(),
  subject: `subject ${n}`,
  message: `message ${n}`,
}));

const onDelete = ()=>{
  const emails = this.state.emails; 
  this.props.checkMail.map((id) =>{ emails.splice(id, 1)}); 
  this.setState({ emails })
}

class App extends Component {
  state = {
    loggedIn: false,
    tab: 'inbox',
    page_no: 1,
    checkMail : [],
    emails: null
  }

  // no called App()
  constructor() {
    super();
  }

  componentDidMount() {
  }

  handleLogout = () => {
    store.dispatch({ type: 'LOGOUT_COMPLETED' });
  }

  handleLeft = ()=>{
    let p = this.state.page_no === 1 ? this.state.page_no : this.state.page_no-1;
    this.setState({page_no: p});
  }
  handleRight = ()=>{
    let p = this.state.page_no === 10 ? this.state.page_no : this.state.page_no+1;
    this.setState({page_no: p});
  }
  render() {
    return this.props.app.loggedIn ?
      <div>
        <a href="#" onClick={() => this.setState({ tab: 'inbox' })}>Inbox </a>
        <a href="#" onClick={() => this.setState({ tab: 'sent' })}>Sent </a>
        <a href="#" onClick={this.handleLogout} className="logout">Logout</a>
        <a href="#" onClick={this.handleLeft} >{"<"}</a>
        <p>{this.state.page_no}</p>
        <a href="#" onClick={this.handleRight} className="logout">{">"}</a>
        
        {this.state.tab === 'inbox' && <Inbox page_no = {this.state.page_no} checkMail = {this.state.checkMail} emails = {this.state.emails}/>}
        {this.state.tab === 'sent' && <EmailList onDelete={onDelete} emails={sentEmails} page_no = {this.state.page_no} checkMail = {this.state.checkMail}/>}
      </div> :
      <Login />
  }
}

const mapStateToProps = function (state) {
  return { app: state.app }
}
const ConnectedApp = connect(mapStateToProps)(App)
const root = () => <Provider store={store}><ConnectedApp /></Provider>
export default root;
