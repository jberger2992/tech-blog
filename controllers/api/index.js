const express = require("express");
const router = express.Router();
const userRoutes = require("./userController");
const blogRoutes = require("./blogpostController");

router.use('/users', userRoutes);
router.use('/blogposts', blogRoutes);

module.exports = router;
