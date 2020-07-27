import React, { useState, useEffect } from 'react';
import faker from 'faker';
import store from './store';
import Inbox from './Inbox';
import Compose from './Compose';
import './App.css';
// arrow functions
import EmailList from './EmailList';
import Login from './Login';
import { Provider, connect, useSelector } from 'react-redux';

let a = Array.from(Array(100), (_, i) => i + 1);
// the mock data has fake email ids just for fun.
const inboxEmails = [1, 2, 3, 4, 5].map(n => ({
  from: faker.internet.email(),
  to: 'me',
  subject: `subject ${n}`,
  message: `message ${n}`,
}));

const sentEmails = a.map(n => ({
  from: 'me',
  to: faker.internet.email(),
  subject: `subject ${n}`,
  message: `message ${n}`,
  mailId: `s${n}`
}));


const App = (props) => {
  const [tab, setTab] = useState('inbox');
  const [pageNo, setPageNo] = useState(1);
  const [toatlMail, setTotalMail] = useState(sentEmails.length);
  const [mailInOnePage, setMailInOnePage] = useState(10);
  const [checkMail, setCheckMail] = useState([]);
  const [trashEmails, setTrashEmails] = useState([]);

  const handleLogout = () => {
    store.dispatch({ type: 'LOGOUT_COMPLETED' });
  }

  const handleLeft = () => {
    let p = pageNo === 1 ? pageNo : pageNo - 1;
    setPageNo(p);
  }
  const handleRight = () => {
    console.log(sentEmails.length);
    let p = pageNo === Math.ceil(toatlMail / mailInOnePage) ? pageNo : pageNo + 1;
    setPageNo(p);
  }

  const handleTab = (newValue) => {
    setTab(newValue);
  }
  const app = useSelector(state => state.app);

  useEffect(() => {
    setTab('sent');
    setTotalMail(sentEmails.length);
  }, [sentEmails.length]);

  window.sentEmails = sentEmails;

  const updatePage = () => {
    setPageNo(1);
  }
  const onDelete = () => {
    if (tab !== 'inbox') {
      checkMail.map((id) => {
        trashEmails.push(sentEmails.find((s) => { return s.mailId == id }));
        let x = sentEmails.findIndex((s) => { return s.mailId == id });
        if (x !== -1)
          sentEmails.splice(x, 1);
      });
      setTab('inbox');
    }
    else {
      fetch('http://localhost:3005/api/deleteMailInInbox',
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({ checkMail, trashEmails })
        }).then(res => res.json()).then(data => data.map(d => trashEmails.push(d)));
    }
    setCheckMail([]);
  }
  return app.loggedIn ?
    <div>
      <div  className="logout"><a href="#" onClick={() => { setTab('inbox'); setPageNo(1); }}>Inbox </a>
      <a href="#" onClick={() => { setTab('compose'); setPageNo(1); }}>Compose</a>
        <a href="#" onClick={() => { setTab('sent'); setPageNo(1); }}>Sent </a>
        <a href="#" onClick={handleLogout}>Logout</a></div>
      <div className="leftright">
        <a href="#" onClick={handleLeft} >{"<"}</a>
        <p >{pageNo}</p>
        <a href="#" onClick={handleRight}>{">"}</a>
      </div>
      <div>
        <button onClick={onDelete}>Delete</button></div>
      {tab === 'inbox' && <Inbox pageNo={pageNo} toatlMail={toatlMail} checkMail={checkMail} />}
      {tab === 'sent' && <EmailList emails={sentEmails} pageNo={pageNo} toatlMail={toatlMail} checkMail={checkMail} />}
      {tab === 'compose' && <Compose emails={sentEmails} onChange={handleTab} />}
    </div> :
    <Login />
}

const ConnectedApp = connect(null)(App)

const root = () => <Provider store={store}><ConnectedApp /></Provider>

export default root;
