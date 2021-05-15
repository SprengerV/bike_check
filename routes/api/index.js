const router = require("express").Router();

const bikeRoute = require("./bike-routes");
const commentRoute = require("./comment-routes");
const likeRoute = require("./like-routes");
const photoRoute = require("./photo-routes");
const userRoute = require("./user-routes");

router.use("/bikes", bikeRoute);
router.use("/comments", commentRoute);
router.use("/likes", likeRoute);
router.use("/photos", photoRoute);
route.use("/users", userRoute);

module.exports = router;