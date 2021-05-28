const router = require('express').Router();
const { Bike, Comment, Like, Photo, User } = require('../../models');
const { requestorIsNotOwner, requestorIsNotAdmin, withAuth } = require('../../utils/auth');



// GET all bikes
router.get('/', (req, res) => {
    Bike.findAll({
        order: [
            ['updated', 'DESC']
        ],
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
            },
            {
                model: Photo,
                attributes: [
                    "url",
                ]
            },
            {
                model: Like,
                attributes: [
                    'bikeId',
                    'userId'
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


// GET bikes by category
router.get('/:category', (req, res) => {
    Bike.findAll({
        where: {
            category: req.params.category
        },
        order: [
            ['updated', 'DESC']
        ],
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
            },
            {
                model: Photo,
                attributes: [
                    "url",
                ]
            },
            {
                model: Like,
                attributes: [
                    'bikeId',
                    'userId'
                ]
            }


        ]
    })
        .then(bikeData => res.json(bikeData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET a single post by ID
router.get('/:id', (req, res) => {
    Bike.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'userId',
            'title',
            'body',
            'updated'
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
                    'body'
                ],
                include: {
                    model: User,
                    attributes: ['userName']
                }
            }
        ]
    })
        .then(bikeData => {
            if (!bikeData) {
                res.status(404).json({ message: "No bike found with that ID" });
            }
            res.json(bikeData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// // POST create new Bike post
router.post('/', withAuth, (req, res) => {
    Bike.create({
        title: req.body.title,
        body: req.body.body,
        category: req.body.category,
        userId: req.user.sub
    })
        .then(bikeData => res.json(bikeData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// PUT update a post
router.put('/:id', withAuth, (req, res) => {
    Bike.findOne({
        where: {
            id: req.params.id
        }
    }).then(bikeData => {
        if (requestorIsNotOwner(bikeData.userId, req.user)) {
            res.status(403).json({ message: "Unauthorized action" });
            return;
        }
        Bike.update(req.body,
            {
                where: {
                    id: req.params.id
                }
            }
        )
            .then(bikeData => {
                if (!bikeData) {
                    res.status(404).json({ message: "No blog post found" });
                    return;
                }
                res.json(bikeData[1]);
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


// Delete a post
router.delete('/:id', withAuth, (req, res) => {
    Bike.findOne({
        where: {
            id: req.params.id
        }
    }).then(bikeData => {
        if (requestorIsNotOwner(bikeData.userId, req.user) || requestorIsNotAdmin(req.user)) {
            res.status(403).json({ message: "Unauthorized action" });
            return;
        }
        Bike.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(bikeData => {
                if (!bikeData) {
                    res.status(404).json({ message: "No blog post found" });
                    return;
                }
                res.json(bikeData);
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