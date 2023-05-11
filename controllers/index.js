const express = require('express');
const router = express.Router();
const userRoutes = require("./api/userController");
const blogpostRoutes = require("./api/blogpostController");

router.use("/api/users", userRoutes);
router.use("/api/blogposts", blogpostRoutes);

module.exports = router;