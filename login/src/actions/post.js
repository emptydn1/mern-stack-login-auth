import * as Types from '../constants/ActionTypes.js';
import callApi from '../utils/apiCaller.js';

export const addPost = (postsData) => {
    return (dispatch) => {
        return callApi('posts/add', 'post', postsData)
            .then(res => {
                console.log(res.data);
                dispatch(actAddPostsToReducer(res.data))
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const actAddPostsToReducer = (postsData) => {
    return {
        type: Types.ADD_POSTS,
        postsData
    }
}




export const getPosts = () => {
    return (dispatch) => {
        dispatch(loadPosts);
        return callApi('posts/', 'get', null)
            .then(res => {
                console.log(res.data);
                dispatch(actGetPostsToReducer(res.data));
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const actGetPostsToReducer = (getPostsData) => {
    return {
        type: Types.GET_POSTS,
        getPostsData
    }
}


export const loadPosts = () => {
    return {
        type: Types.LOANDING_POSTS
    }
}