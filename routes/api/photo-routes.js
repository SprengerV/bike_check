const router = require('express').Router();
const { Bike, Comment, Like, Photo, User  } = require('../../models');
const withAuth = require('../../client/src/auth');

// Get all photos
router.get('/', (req, res) => {
    Photo.findAll({
        attributes: [
            'id',
            'bikeId',
            'userId',
            'url',
            'uploaded',
        ],
    })
    .then(photoData => res.json(photoData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});