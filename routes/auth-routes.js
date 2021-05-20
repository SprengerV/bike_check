const router = require('express').Router();
const withAuth = require('../utils/auth');
const User = require('../models').User;

router.post('/create', withAuth, (req, res) => {
    const user = req.body.user;
    console.log(user)
    User.create({
        id: user.sub,
        userName: user.nickname,
        avatar: user.picture
    })
    .then(user => {
        user ?
            res.status(200).json(user)
            :
            res.status(400).json({ message: 'User already in database' });
    })
    .catch(err => {
        console.error(err);
        res.status(500);
    });
});

module.exports = router;