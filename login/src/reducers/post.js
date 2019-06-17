import * as Types from '../constants/ActionTypes.js';

const InitialState = {
    list: null,
    loading: false
}
const post = (state = InitialState, action) => {
    switch (action.type) {
        case Types.ADD_POSTS:
            return { ...state, list: [action.postsData, ...state.list] }
        case Types.LOANDING_POSTS:
            return { ...state, loading: true };
        case Types.GET_POSTS:
            return { ...state, loading: false, list: action.getPostsData }
        default:
            return state;
    }
}

export default post;