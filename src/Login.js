import React, { useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';
import { dispatch } from '../node_modules/rxjs/internal/observable/range';
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
const handleLogin = (username, password, dispatch) => {
    dispatch({ type: 'LOGIN_STARTED' });
    login(username, password)
        .then(res => {
            if (res.status === 'success') {
                dispatch({ type: 'LOGIN_COMPLETED' })
            } else
                dispatch({ type: 'LOGIN_FAILED' })
        })
}

const LoginForm = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => setUsername(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value)

    const loginForm = useSelector((state) => state.loginForm);
    const dispatch = useDispatch();
    return <div>
        < h2 > Emails Login </h2 > <br />
        Username: <input type="text" minLength="3" onChange={handleUsernameChange} /> <br />
        Password: <input type="password" minLength="6" onChange={handlePasswordChange} /> <br />
        <button onClick={() => handleLogin(username, password, dispatch)}>Login</button>
        {loginForm.loading && <div>Logging In ...</div>}
        {loginForm.error && <div>{loginForm.error}</div>}
    </div >

}

export default LoginForm



