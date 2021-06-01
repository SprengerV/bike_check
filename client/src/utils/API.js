import axios from "axios";

const API = {
    getBikes: function() {
        return axios.get(`api/bikes`);
    },
    getBikesCat: function(cat) {
        return axios.get(`api/bikes/${cat}`)
    },
    getUserBikes: function(id) {
        return axios.get(`api/bikes/user/${id}`)
    },
    getUsers: function(id) {
        return axios.get(`api/user/${id}`);
    },
    getPhotos: function() {
        return axios.get("api/photos");
    },
    getComments: function() {
        return axios.get("api/comments");
    },
}

export default API;
