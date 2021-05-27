const router = require('express').Router();
const { Bike, Comment, Like, Photo, User } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all likes
router.get('/', (req, res) => {
    Like.findAll({
        attributes: [
            'bikeId',
            'userId',
        ],
        include: [
            {
                model: User,
                attributes: ['userName']
            }
        ]
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
        userId: req.user.sub
    })
        .then(likeData => res.json(likeData))
        .catch(err => {
            res.status(400).json(err);
        });
});


// DELETE a like
router.delete('/:id', withAuth, (req, res) => {
    Like.findOne({
        where: {
            id: req.params.id
        }
    }).then(likeData => {
        if (likeData.userId !== req.user.sub) {
            res.status(403).json({ message: "Unauthorized action" });
            return;
        }
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
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;