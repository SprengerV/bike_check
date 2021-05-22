const router = require('express').Router();
<<<<<<< HEAD
=======
const { Bike, Comment, Like, Photo, User  } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all likes
router.get('/', (req, res) => {
    Like.findAll({
        attributes: [
            'bikeId',
            'userId',
        ],
    })
    .then(likeData => res.json(likeData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

// POST a like
router.post('/', withAuth, (req, res) => {
    Like.create({
        bikeId: req.body.bikeId,
        userId: req.body.userId
    })
    .then(likeData => res.json(likeData))
    .catch(err => {
        res.status(400).json(err);
    });
});


// DELETE a like
router.delete('/:id', withAuth, (req, res) => {
    Like.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(likeData => {
        if (!likeData) {
            res.status(404).json({ message: "No like found" });
            return;
        }
        res.json(likeData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
>>>>>>> 02e514fdd62007ea55befebc886cf5d97ee8f8b7

module.exports = router;