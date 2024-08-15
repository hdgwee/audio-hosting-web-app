import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
} from './actions';
import { combineReducers } from 'redux';

const initialState = {
    isFetching: false,
    isAuthenticated: !!localStorage.getItem('credential'),
    user: localStorage.getItem('credential')
        ? JSON.parse(localStorage.getItem('credential'))
        : { token: null, username: '' },
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isFetching: true,
                isAuthenticated: false,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: true,
                errorMessage: '',
                user: action.user,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.errorMessage,
            };
        case LOGOUT_REQUEST:
            return {
                ...state,
                isFetching: true,
                isAuthenticated: true,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                user: action.user,
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    auth: authReducer,
});

export default rootReducer;