export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export function login({
    username,
    password,
}) {
    return (dispatch) => {
        dispatch(requestLogin());

        fetch("http://localhost:9000/user/login", {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify({ username: username, password: password }),
        }).then((res) => {
            if (res.status === 200) {
                const user = {
                    username,
                    token: "",
                };

                localStorage.setItem('credential', JSON.stringify(user));
                dispatch(receiveLogin(user));
            }
        }).catch(() => {
            dispatch(receiveLoginError());
        });

        dispatch(receiveLoginError());
    };
}

function requestLogin() {
    return {
        type: LOGIN_REQUEST,
    };
}

function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        user,
    };
}

function receiveLoginError() {
    return {
        type: LOGIN_FAILURE
    };
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export function logout() {
    return (dispatch) => {
        dispatch(requestLogout());
        localStorage.removeItem('credential');
        dispatch(receiveLogout());
    };
}

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
    };
}

function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false,
        user: { token: null, username: '' },
    };
}