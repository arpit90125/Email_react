import React, { useState, useEffect } from 'react';
import EmailComponent from './Email';

const EmailList = (props) => {
    const [emails, setEmails] = useState(props.emails)
    const [pageNo, setPageNo] = useState(props.pageNo)
    const handleDelete = (idx) => {
        const newEmails = [...emails];
        newEmails.splice(idx, 1);
        setEmails(newEmails);
    }
    useEffect(
        ()=>{
            setPageNo(props.pageNo);
        },[props.pageNo]
    );
    const onDelete = (idx) => {
        const emails = this.state.emails; 
        //this.props.checkMail.map((id) =>{ emails.splice(id, 1)}); 
        emails.filter((email)=>{return !this.props.checkMail.includes(email.idx)});
        this.setState({ emails })
    }

    return (
        emails.slice((pageNo-1)*10,pageNo*10)
            .map((email, idx) =>
                <EmailComponent
                    from={email.from}
                    subject={email.subject}
                    to={email.to}
                    important={Math.random() < 0.3}
                    message={email.message}
                    onDelete={() => handleDelete(idx)}
                    mailId={email.mailId}
                    checkMail={props.checkMail}
                 />)
    );


}

export default EmailList;