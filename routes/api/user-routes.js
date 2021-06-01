const router = require('express').Router();
const { Bike, Dislike, Comment, Like, Photo, User } = require('../../models');
const { requestorIsNotOwner, withAuth } = require('../../utils/auth');

// GET all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: [
            'id',
            'userName',
            'location',
            'avatar',
        ],
    })
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET a single user by ID
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'userName',
            'location',
            'avatar',
            'bio'
        ],
        include: [
            {
                model: Bike,
                attributes: ['id','title', 'userId', 'body', 'updated'],
                include: [
                    {
                        model: Comment,
                        attributes: ['id', 'userId', 'bikeId', 'body'],
                        include: [
                            {
                            model: User,
                            attributes: ['userName', 'id']
                            }
                        ]
                    },
                    {
                        model: Like,
                        attributes: ['bikeId', 'userId']
                    },
                    {
                        model: Dislike,
                        attributes: ['bikeId', 'userId']
                    },
                    {
                        model: Photo,
                        attributes: ['id', 'bikeId', 'userId', 'url', 'uploaded']
                    },
                    {
                        model: User,
                        attributes: ['userName', 'id']
                    }
                ]
                
            },
            {
            model: Photo,
            attributes: ['url']
            },
        ]
    })
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// PUT for user updates
router.put('/:id', withAuth, (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    }).then(userData => {
        if (requestorIsNotOwner(userData.id, req.user)) {
            res.status(403).json({ message: "Unauthorized action" });
            return;
        }
        User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        })
            .then(userData => {
                if (!userData) {
                    res.status(400).json({ message: "No user found with that ID" });
                }
                res.json(userData);
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


// Delete a user
router.delete('/:id', withAuth, (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    }).then(userData => {
        if (requestorIsNotOwner(userData.id, req.user)) {
            res.status(403).json({ message: "Unauthorized action" });
            return;
        }
        User.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: "No user found with that ID" });
                    return;
                }
                res.json(userData);
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