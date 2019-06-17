import * as Types from '../constants/ActionTypes.js';
const InitialState = {
    isAuthenticated: false,
    user: null
}

const auth = (state = InitialState, action) => {
    switch (action.type) {
        case Types.SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: Object.keys(action.payload).length !== 0,
                user: action.payload
            }
        default:
            return state
    }
}
export default auth;