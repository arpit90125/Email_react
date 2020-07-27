import React from 'react';

const EmailComponent = ({ message, subject, from, to, important, onDelete,mailId,checkMail }) => {
    const styleClass = important ? 'important' : '';
    const addCheckMail=()=>{
        checkMail.push(mailId);
    }
    return <div className={`email ${styleClass}`} >
        <input type="checkbox" id="" onChange={addCheckMail}></input>
        From: {from} <br />
        To: {to} <br />
        Subject: {subject}<br />
        Message: {message}
    </div>
}

export default EmailComponent;