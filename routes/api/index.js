const router = require("express").Router();

const bikeRoute = require("./bike-routes");
const commentRoute = require("./comment-routes");
const likeRoute = require("./like-routes");
const dislikeRoute = require("./dislike-routes");
const photoRoute = require("./photo-routes");
const userRoute = require("./user-routes");
const categoryRoutes = require("./category-route")

router.use("/bikes", bikeRoute);
router.use("/comments", commentRoute);
router.use("/likes", likeRoute);
router.use("/dislikes", dislikeRoute);
router.use("/category", categoryRoutes);
router.use("/photos", photoRoute);
router.use("/user", userRoute);

module.exports = router;