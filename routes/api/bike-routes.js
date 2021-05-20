const router = require('express').Router();
const { Bike, Comment, Like, Photo, User  } = require('../../models');
const withAuth = require('../../utils/auth');
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
            },
            {
                model: Photo,
                attributes: [
                    "url",
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


// POST create new Bike post
router.post('/', withAuth, (req, res) => {
    Bike.create({
        title: req.body.title,
        body: req.body.body,
        userId: req.session.userId,
        category: req.session.userId
    })
    .then(bikeData => res.json(bikeData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// PUT update a post
router.put('/:id', withAuth, (req, res) => {
    Bike.update(
        {
            title: req.body.title,
            body: req.body.body
        },
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
        res.json(bikeData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// Delete a post
router.delete('/:id', withAuth, (req, res) => {
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
});


module.exports = router;