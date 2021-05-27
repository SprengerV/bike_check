const router = require('express').Router();
const { Bike, Comment, Like, Photo, User } = require('../../models');
const withAuth = require('../../utils/auth');
const { requestorIsOwner, requestorIsAdmin } = require('../../utils/auth');


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
router.post('/', withAuth, (req, res) => {
    Comment.create({
        body: req.body.body,
        bikeId: req.body.bikeId,
        userId: req.user.sub
    })
        .then(commentData => res.json(commentData))
        .catch(err => {
            res.status(400).json(err);
        });
});

// PUT update comment
router.put('/:id', withAuth, (req, res) => {
    Comment.findOne({
        where: {
            id: req.params.id
        }
    }).then(commentData => {
        if (commentData.userId !== req.user.sub) {
            res.status(403).json({ message: "Unauthorized action" });
            return;
        }
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
                res.json(commentData[1]);
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


// Delete comment
router.delete('/:id', withAuth, (req, res) => {
    Comment.findOne({
        where: {
            id: req.params.id
        }
    }).then(commentData => {
        if (!requestorIsOwner(commmentData.userId, req.user) || !requestorIsAdmin(req.user)) {
            res.status(403).json({ message: "Unauthorized action" });
            return;
        }
        Comment.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(commentData => {
                if (!commentData) {
                    res.status(404).json({ message: "No comment found" });
                    return;
                }
                res.json(commentData);
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