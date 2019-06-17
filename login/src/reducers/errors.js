import * as Types from '../constants/ActionTypes.js';
const initialState = {}

const errors = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_ERRORS:
            return action.userErros;
        default:
            return state;
    }
}

export default errors;