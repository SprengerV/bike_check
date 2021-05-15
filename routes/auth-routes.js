const router = require('express').Router();
const withAuth = require('../utils/auth');
const User = require('../models').User;

router.post('/', withAuth, (req, res) => {
    const user = req.body.user;
    User.create({
        id: user.id,
        userName: user.nickname,
    })
    .then(user => {
        user ?
            res.statusCode(200).json(user)
            :
            res.statusCode(400).json({ message: 'User already in database' });
    });
});

module.exports = router;