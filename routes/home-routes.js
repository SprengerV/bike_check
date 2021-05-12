const router = require('express').Router();
const { Bike, Comment, Like, Photo, User  } = require('../models');
const userAuth = require('PATHTOAUTH');
// do we need a timestamp helper here for post times?

// GET for homepage
router.get('/', (req, res) => {
    Bike.findAll({
        attributes: [
            'id',
            'userId',
            'body',
            'updated'
        ]
    })
});

// GET user login
router.get('/login', (req, res) => {
    
})