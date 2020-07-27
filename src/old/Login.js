import React, { Component } from 'react'
import { connect } from 'react-redux';
const username = 'ivp'
const password = 'ivp'
const login = (username, password) => fetch('http://localhost:3005/api/login',
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            username,
            password
        })
    }).then(res => res.json())
class LoginForm extends Component {
    state = {
        username: '',
        password: '',
    }
    handleUsernameChange = (e) => this.setState({ username: e.target.value })
    handlePasswordChange = (e) => this.setState({ password: e.target.value })
    render() {
        return <div>
            < h2 > Emails Login </h2 > <br />
            Username: <input type="text" minLength="3" onChange={this.handleUsernameChange} /> <br />
            Password: <input type="password" minLength="6" onChange={this.handlePasswordChange} /> <br />
            <button onClick={() => this.props.handleLogin(this.state.username, this.state.password)}>Login</button>
            {this.props.loginForm.loading && <div>Logging In ...</div>}
            {this.props.loginForm.error && <div>{this.props.loginForm.error}</div>}
        </div >
    }
}
const mapStateToProps = function (state) {
    //debugger;
    return {
        loginForm: state.loginForm
    }
}
const mapDispatchToProps = function (dispatch) {
    return {
        handleLogin: (username, password) => {
            dispatch({ type: 'LOGIN_STARTED' });
            login(username, password)
                .then(res => {
                    if (res.status === 'success') {
                        dispatch({ type: 'LOGIN_COMPLETED' })
                    } else
                        dispatch({ type: 'LOGIN_FAILED' })
                })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)