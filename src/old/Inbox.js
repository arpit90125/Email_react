import store from './store';
import React, { Component } from 'react';
import EmailList from './EmailList';

const loadInbox = (username, password) => fetch('http://localhost:3005/api/inbox',
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "GET",
    }).then(res => res.json())

class Inbox extends Component {
    state = {}
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState().inbox));
        store.dispatch({ type: 'INBOX_LOAD_STARTED' });
        loadInbox().then(data => store.dispatch(
            {
                type: 'INBOX_LOAD_COMPLETED', payload: data
            }));
        
    }

    render() {
        return <div>

            {this.state.loading && <div>Loading your data ...</div>}
            {this.state.emails && <EmailList emails={this.state.emails} page_no = {this.props.page_no} checkMail = {this.props.checkMail}/>}
        </div>
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
}

export default Inbox;