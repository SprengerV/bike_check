import axios from 'axios';

const userCreate = (user, token) => {
    return axios.post('/auth/', { user }, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
};
const postCreate = (user, token, post) => {
    return axios.post('/post/create', {
        userId: user.id,
        body: post.body
    })
}

const api = {
    userCreate
};

export default api;