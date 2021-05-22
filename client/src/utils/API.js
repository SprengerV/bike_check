import axios from "axios";

const API = {
    getBikes: function(cat) {
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
<<<<<<< HEAD
    postBike: function() {
        return axios.put("api/bikes")
    },
    postPhoto: function() {
        return axios.put("api/photos")
    }
}
=======
}

export default API;
>>>>>>> 8dcb63afd662643662bb709a7c5f9c0e38e1a827
