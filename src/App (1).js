import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import faker from 'faker';
import store from './store';
import Inbox from './Inbox';

import './App.css';
// arrow functions
import EmailComponent from './Email';
import EmailList from './EmailList';
import Login from './Login';
import { Provider, connect } from 'react-redux';

// the mock data has fake email ids just for fun.
const inboxEmails = [1, 2, 3, 4, 5].map(n => ({
  from: faker.internet.email(),
  to: 'me',
  subject: `subject ${n}`,
  message: `message ${n}`,
}));

const sentEmails = [1, 2, 3, 4, 5].map(n => ({
  from: 'me',
  to: faker.internet.email(),
  subject: `subject ${n}`,
  message: `message ${n}`,
}));

const App = (props) => {
  const [tab, setTab] = useState('inbox');

  const handleLogout = () => {
    store.dispatch({ type: 'LOGOUT_COMPLETED' });
  }

  const app = useSelector((state) => state.app)

  return app.loggedIn ?
    <div>
      <a href="#" onClick={() => setTab('inbox')}>Inbox </a>
      <a href="#" onClick={() => setTab('sent')}>Sent </a>
      <a href="#" onClick={handleLogout} className="logout">
        Logout
        </a>
      {tab === 'inbox' && <Inbox />}
      {tab === 'sent' && <EmailList emails={sentEmails} />}
    </div> :
    <Login />

}

const ConnectedApp = connect(null)(App)

const root = () => <Provider store={store}><ConnectedApp /></Provider>

export default root;


app.post('/api/deleteMailInInbox', (req, res) => {
  const trashEmails = [];
  req.body.checkMail.map((id) => {
      
      let x = inboxEmails.findIndex((s) => { return s.mailId == id });
      if (x !== -1) {
          trashEmails.push(inboxEmails[x]);
          inboxEmails.splice(x, 1);
      }
  });
  sendWithRandomDelay(res, inboxEmails, trashEmails);
});