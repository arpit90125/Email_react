import store from './store';
import React, { useEffect, useState } from 'react';
import EmailList from './EmailList';
import { connect, useSelector, useDispatch } from 'react-redux';

const loadInbox = () => fetch('http://localhost:3005/api/inbox',
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "GET",
    }).then(res => res.json())



const Inbox = (props) => {
    const dispatch = useDispatch();

    const [lastRefreshedTime, setLastRefreshedTime] = useState(new Date());
    const dispatchLoadInbox = (dispatch) => {
        setLastRefreshedTime(new Date());
        dispatch({ type: 'INBOX_LOAD_STARTED' });
        loadInbox().then(data => store.dispatch(
            {
                type: 'INBOX_LOAD_COMPLETED', payload: data
            }));
    }
    
    const inbox = useSelector(state => state.inbox)
    useEffect(()=>{
        const timer = setInterval(()=>{
            document.title = Math.floor((new Date() - lastRefreshedTime)/1000) + ' since last Refresh' 
        })
        return () => clearInterval(timer);
    },[lastRefreshedTime])
    useEffect(() =>
        dispatchLoadInbox(dispatch)
    , [props.checkMail])

    return <div>
        <button onClick = {()=>dispatchLoadInbox(dispatch)}>Refresh</button>
        {inbox.loading && <div>Loading your data ...</div>}
        {inbox.emails && <EmailList emails={inbox.emails} pageNo={props.pageNo}  checkMail={props.checkMail}/>}
    </div>
}


export default Inbox