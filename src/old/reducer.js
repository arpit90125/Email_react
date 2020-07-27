import { combineReducers } from 'redux';

const loginReducer = (state = { loading: false, error: null }, action) => {
    switch (action.type) {
        case 'LOGIN_STARTED':
            return {
                loading: true,
                error: null
            }

        case 'LOGIN_FAILED':
            return {
                loading: false,
                error: 'Username and Password mismatch'
            }
        default:
            return state;
    }
}

const inboxReducer = (state = { loading: false, emails: null }, action) => {
    switch (action.type) {
        case 'INBOX_LOAD_STARTED':
            return {
                loading: true,
                emails: null
            }

        case 'INBOX_LOAD_COMPLETED':
            return {
                loading: false,
                emails: action.payload
            }
        default:
            return state;
    }
}

const appReducer = (state = { loggedIn: false }, action) => {
    switch (action.type) {
        case 'LOGIN_COMPLETED':
            return { loggedIn: true };
            break;
        case 'LOGOUT_COMPLETED':
            return { loggedIn: false };
            break;
        default:
            return state;
    }
}

const rootReducer =  combineReducers({
    app: appReducer,
    loginForm: loginReducer,
    inbox: inboxReducer,
})

export default rootReducer;