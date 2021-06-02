const router = require('express').Router();
const { Bike, Comment, Like, Dislike, Photo, User } = require('../../models');

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
                    'created_at'
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
            },
            {
                model: Dislike,
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

module.exports = router;