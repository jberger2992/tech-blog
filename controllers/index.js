const express = require('express');
const router = express.Router();

const userRoutes = require("./userController");
const blogpostRoutes = require("./blogpostController");

router.get("/",(req,res)=>{
    res.send("Tech Blog Homepage")
});

router.use("/api/users", userRoutes);
router.use("/api/blogposts", blogpostRoutes);

module.exports = router;