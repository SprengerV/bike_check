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
}

export default API;
