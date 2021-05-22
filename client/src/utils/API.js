import axios from "axios";

export default {
    getBikes: function() {
        return axios.get("api/bikes");
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
    postBike: function() {
        return axios.put("api/bikes")
    },
    postPhoto: function() {
        return axios.put("api/photos")
    }
}