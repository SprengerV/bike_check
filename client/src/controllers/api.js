import axios from 'axios';

const userCreate = (user, token) => {
    return axios.post('/auth/', { user }, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
};
const post = (userId, token, post) => {
    return axios.post('/post/', {
        userId,
        ...post
    },
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
const editPost = (userId, token, post) => {
    return axios.put('/post/', {
        userId,
        ...post
    },
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
const delPost = (userId, token, post) => {
    return axios.delete('/post', {
        userId,
        ...post
    },
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
const comment = (userId, token, comm) => {
    return axios.post('/post/comment', {
        userId,
        ...comm
    },
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
const editComment = (userId, token, comm) => {
    return axios.put('/post/comment', {
        userId,
        ...comm
    },
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
const delComment = (userId, token, comm) => {
    return axios.delete('/post/comment', {
        userId,
        ...comm
    },
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
const like = (userId, token, postId) => {
    return axios.post('/post/like', {
        userId,
        postId
    },
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
const delLike = (userId, token, postId) => {
    return axios.delete('/post/like', {
        userId,
        postId
    },
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const api = {
    userCreate,
    post,
    editPost,
    delPost,
    comment,
    editComment,
    delComment,
    like,
    delLike
};

export default api;