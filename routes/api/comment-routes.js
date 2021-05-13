const router = require('express').Router();
const { Bike, Comment, Like, Photo, User  } = require('../../models');
const userAuth = require('../../client/src/auth');
// do we need a timestamp helper here for post times?

// GET all comments
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: [
            'id',
            'userId',
            'bikeId',
            'body',
        ],
    })
    .then(commentData => res.json(commentData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

// POST a comment
router.post('/', userAuth, (req, res) => {
    if (req.session) {
        Comment.create({
            body: req.body.body,
            bikeId: req.body.bikeId,
            userId: req.session.userId
        })
        .then(commentData => res.json(commentData))
        .catch(err => {
            res.status(400).json(err);
        });
    }
});

// PUT / update comment
router.put('/:id', userAuth, (req, res) => {
    Comment.update(req.body,
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(commentData => {
        if (!commentData[0]) {
            res.status(404).json({ message: "No comment found" });
            return;
        }
        res.json(commentData);
    })
    .catch
})