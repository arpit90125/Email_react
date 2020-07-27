import React, { Component } from 'react';
import EmailComponent from './Email';

class EmailList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emails: props.emails,
            page_no : props.page_no

        }
    }

    onDelete = (idx) => {
        const emails = this.state.emails; 
        //this.props.checkMail.map((id) =>{ emails.splice(id, 1)}); 
        emails.filter((email)=>{return !this.props.checkMail.includes(email.idx)});
        this.setState({ emails })
    }

    render() {
        return (
            <div>
            <button className="delete" onClick={this.onDelete} >Delete</button>
            {this.state.emails.slice((this.props.page_no-1)*10,this.props.page_no*10)
            .map((email, idx) => 
              <EmailComponent
              from={email.from}
              subject={email.subject}
              to={email.to}
              important={Math.random() < 0.3}
              message={email.message}
              idx={idx}
              checkMail = {this.props.checkMail} />
              )}
              </div>
          );
    }

}

export default EmailList;