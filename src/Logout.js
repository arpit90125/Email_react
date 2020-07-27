import React, { Component } from 'react'

class Logout extends Component {
    

    render() {
        const { onLogout } = this.props;
        return <div>
            <button onClick={this.handleLogout}>Logout</button>
        </div >
    }
}

export default Logout