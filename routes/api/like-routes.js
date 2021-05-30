const router = require('express').Router();
const { Like, User } = require('../../models');
const { requestorIsNotOwner, withAuth } = require('../../utils/auth');

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
    Like.findOne({
        where: {
            bikeId: req.body.bikeId,
            userId: req.user.sub
        }
    }).then(likeData => {
        if (likeData) {
            res.status(403).json({ message: "User already liked post" });
            return;
        }
        Like.create({
            bikeId: req.body.bikeId,
            userId: req.user.sub
        })
            .then(likeData => res.json(likeData))
            .catch(err => {
                res.status(400).json(err);
            });
    });
});


// DELETE a like
router.delete('/:id', withAuth, (req, res) => {
    Like.destroy({
        where: {
            bikeId: req.params.id,
            userId: req.user.sub
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


module.exports = router;