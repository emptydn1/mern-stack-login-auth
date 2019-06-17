import * as Types from '../constants/ActionTypes.js';
import callApi from '../utils/apiCaller.js';
import setAuthorizeHeader from '../utils/setAuthorizeHeader.js'

// send user registration data
export const registerUser = (userData, history) => {
    return (dispatch) => {
        return callApi('register', 'post', userData)
            .then(res => {
                history.push('/login');
            })
            .catch(err => {
                dispatch(actFetchErrors(err.response.data));
            })
    }
}

//errors is sended to reducer 'errors'
export const actFetchErrors = (userErros) => {
    return {
        type: Types.GET_ERRORS,
        userErros
    }
}

//confirm data and fetch token
export const loginUser = (data) => {
    return (dispatch) => {
        return callApi('login', 'post', data)
            .then(res => {
                const { token } = res.data;
                localStorage.setItem('jwt', token);
                setAuthorizeHeader(token);
                dispatch(getCurrentUser());
            })
            .catch(err => {
                dispatch(actFetchErrors(err.response.data));
            })
    }
}


// get data from token which is decoded
export const getCurrentUser = () => {
    return (dispatch) => {
        return callApi('', 'get', null)
            .then(res => {
                dispatch(actSetCurrentUser(res.data));
            })
    }
}

// data is sended to reducer
export const actSetCurrentUser = (payload) => {
    return {
        type: Types.SET_CURRENT_USER,
        payload
    }
}


export const logoutUser = () => {
    return (dispatch) => {
        localStorage.removeItem('jwt');
        setAuthorizeHeader();
        dispatch(actSetCurrentUser(false))
    }
}
