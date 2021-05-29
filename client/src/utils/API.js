import axios from "axios";

const API = {
    getBikes: function() {
        return axios.get(`api/bikes`);
    },
    getBikeCat: function(cat) {
        return axios.get(`api/bikes/${cat}`)
    },
    getUsers: function() {
        return axios.get("api/users");
    },
    getPhotos: function() {
        return axios.get("api/photos");
    },
    getComments: function() {
        return axios.get("api/comments");
    },
    getLikes: function(bikeId) {
        return axios.get(`api/likes/${bikeId}`);
    },
    delLike: function(userId, token, bikeId) {
        return axios.delete('/api/likes', {
            userId,
            bikeId
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    like: function(userId, token, bikeId) {
        return axios.post('/api/likes', {
            userId,
            bikeId
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}

export default API;
