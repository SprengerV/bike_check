const router = require('express').Router();
const { Bike, Comment, Like, Photo, User  } = require('../../models');
const withAuth = require('../../utils/auth');

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

    router.post('/', withAuth, (req, res) => {
        
        Photo.create({
            url: req.body.url,
            bikeId: req.body.url,
            userId: req.session.userId,
        })
        .then(photoData => res.json(photoData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });
});

module.exports = router;