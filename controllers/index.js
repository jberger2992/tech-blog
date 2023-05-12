const express = require('express');
const router = express.Router();
const apiRoutes = require("./api");
const frontendRoutes = require("./frontendController")


router.use("/api", apiRoutes);
router.use("/", frontendRoutes);

module.exports = router;