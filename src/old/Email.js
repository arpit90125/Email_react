import React from 'react';

const EmailComponent = ({ message, subject, from, to, important,idx,checkMail}) => {
    const styleClass = important ? 'important' : '';
    const onCheck = () =>{
        checkMail.push(idx);
    }
    return <div className={`email ${styleClass}`} >
        <input type = "checkbox" id = {idx} onChange = {onCheck}></input>
        From: {from} <br />
        To: {to} <br />
        Subject: {subject}<br />
        Message: {message}
    </div>
}

export default EmailComponent;