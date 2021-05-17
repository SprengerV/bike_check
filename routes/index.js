const path = require("path");
const router = require("express").Router();
// const apiRoutes = require('./api');
const authRoutes = require('./auth-routes')

router.use('/', homeRoutes);
// router.use('/api', apiRoutes);
router.use('/profile', profileRoutes);
router.use('/auth', authRoutes);



router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
});

module.exports = router;