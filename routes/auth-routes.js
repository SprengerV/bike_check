const router = require('express').Router();
const { withAuth } = require('../utils/auth');
const User = require('../models').User;

router.post('/create', withAuth, (req, res) => {
    const user = req.body.user;
    const createUser = (user) => {
        User
            .create({
                id: user.sub,
                userName: user.nickname,
                avatar: user.picture,
                location: null
            })
            .then(user => res.status(200).json(user))
            .catch(err => {
                console.error(err);
                res.status(500);
            });
    }
    User
        .findByPk(user.sub)
        .then(searched => {
            searched
                ? res.status(200).json(searched)
                : createUser(user);
        })
        .catch(err => {
            console.error(err);
            res.status(500)
        })
    

});

module.exports = router;