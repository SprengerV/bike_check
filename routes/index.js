const path = require("path");
const router = require("express").Router();
const apiRoutes = require('./api');
<<<<<<< HEAD
const authRoutes = require('./auth-routes')

// router.use('/', homeRoutes);
router.use('/api', apiRoutes);
// router.use('/profile', profileRoutes);
=======
const authRoutes = require('./auth-routes');

// API routes
router.use('/api', apiRoutes);
// Auth Routes
>>>>>>> 02e514fdd62007ea55befebc886cf5d97ee8f8b7
router.use('/auth', authRoutes);


// If no API routes, then send to react
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
});

module.exports = router;