const path = require("path");
const router = require("express").Router();
const apiRoutes = require('./api');
const authRoutes = require('./auth-routes')

// API routes
router.use('/api', apiRoutes);
// Auth Routes
router.use('/auth', authRoutes);


// If no API routes, then send to react
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
});

module.exports = router;