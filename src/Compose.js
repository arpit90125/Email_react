import React , {useState, useEffect} from 'react';

import { prependOnceListener } from 'process';
const Compose = (props)=>{
    const [to,setTo]=useState();
    const [subject,setSubject] = useState();
    const [message,setMessage] = useState();
    const mLength = Number(props.emails.length);
    window.emailss = props.emails.length;
    //alert(mLength);
    const newMailId = props.emails[mLength-1].mailId;
    const updateMails = ()=>{
        
        props.emails.push({
            from: 'me',
            to:to,
            subject:subject,
            message:message,
            mailId: `${newMailId[0]}${Number(newMailId.substr(1))+1}`,
        });
        props.onChange('sent');
    }
    return <div>
            To: <input type="email" id="to" onChange={(e)=>setTo(e.target.value)}/><br />
            Subject: <input type="text" onChange={(e)=>setSubject(e.target.value)} /><br />
            Message: <input type="text" id="message" onChange={(e)=>setMessage(e.target.value)}/><br />   
            <button onClick={updateMails}>Submit</button>
    </div>;
}
export default Compose;