const router = require('express').Router();
const { Bike, Comment, Like, Photo, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all photos
router.get('/', (req, res) => {
    Photo.findAll({
        attributes: [
            'id',
            'bikeId',
            'userId',
            'url',
            'uploaded',
        ],
    })
        .then(photoData => res.json(photoData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});


// GET one photo
router.get('/:id', (req, res) => {
    Photo.findOne({
        attributes: [
            'id',
            'bikeId',
            'userId',
            'url',
            'uploaded',
        ],
    })
        .then(photoData => res.json(photoData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});


// POST a new photo
router.post('/',  (req, res) => {
    Photo.create({
        url: req.body.url,
        userId: req.body.userId,
        bikeId: req.body.bikeId
    })
        .then(photoData => res.json(photoData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// PUT to update a photo
router.put('/:id', withAuth, (req, res) => {
    Photo.findOne({
        where: {
            id: req.params.id
        }
    }).then(photoData => {
        if (photoData.userId !== req.user.sub) {
            res.status(403).json({ message: "Unauthorized action" });
            return;
        }
        Photo.update(
            {
                url: req.body.url
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )
            .then(photoData => {
                if (!photoData) {
                    res.status(404).json({ message: "No photo found" });
                    return;
                }
                res.json(photoData[1]);
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


// DELETE a photo
router.delete('/:id', withAuth, (req, res) => {
    Photo.findOne({
        where: {
            id: req.params.id
        }
    }).then(photoData => {
        if (photoData.userId !== req.user.sub) {
            res.status(403).json({ message: "Unauthorized action" });
            return;
        }
        Photo.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(photoData => {
                if (!photoData) {
                    res.status(404).json({ message: "No photo found" });
                    return;
                }
                res.json(photoData);
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
