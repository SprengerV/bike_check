const router = require('express').Router();
const { Like, Dislike, User } = require('../../models');
const { withAuth } = require('../../utils/auth');

// GET all dislikes
router.get('/', (req, res) => {
    Dislike.findAll({
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
        .then(dislikeData => res.json(dislikeData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

// POST a dislike
router.post('/', withAuth, (req, res) => {
    Like.destroy({
        where: {
            bikeId: req.body.bikeId,
            userId: req.user.sub
        }
    }).then( () => {
        Dislike.findOne({
            where: {
                bikeId: req.body.bikeId,
                userId: req.user.sub
            }
        }).then(dislikeData => {
            if (dislikeData) {
                res.status(403).json({ message: "User already disliked post" });
                return;
            }
            Dislike.create({
                bikeId: req.body.bikeId,
                userId: req.user.sub
            })
                .then(dislikeData => res.json(dislikeData))
                .catch(err => {
                    res.status(400).json(err);
                });
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
  
});


// DELETE a dislike
router.delete('/:id', withAuth, (req, res) => {
    Dislike.destroy({
        where: {
            bikeId: req.params.id,
            userId: req.user.sub
        }
    })
    .then(dislikeData => {
        if (!dislikeData) {
            res.status(404).json({ message: "No dislike found" });
            return;
        }
        res.json(dislikeData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;