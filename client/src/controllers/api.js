import axios from 'axios';

const userCreate = (user, token) => {
    return axios.post('/auth/', {
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: { user }
    });
};

const api = {
    userCreate
};

export default api;