import { combineReducers } from 'redux';
import errors from './errors';
import auth from './auth';
import post from './post';

const appReducers = combineReducers({
    errors,
    auth,
    post
})

export default appReducers;
