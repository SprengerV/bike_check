const router = require('express').Router();
const { Bike, Comment, Like, Photo, User  } = require('../../models');
const withAuth = require('../../client/src/auth');
// do we need a timestamp helper here for post times?

// GET all bikes
router.get('/', (req, res) => {
    Bike.findAll({
        attributes: [
            'id',
            'userId',
            'title',
            'body',
            'updated',
        ],
        include: [
            {
                model: User,
                attributes: ['userName']
            },
            {
                model: Comment,
                attributes: [
                    'id',
                    'userId',
                    'bikeId',
                    'body',
                ],
                include: {
                    model: User,
                    attributes: ['userName']
                }
            }
        ]
    })
    .then(bikeData => res.json(bikeData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});