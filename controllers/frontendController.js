const express = require('express');
const router = express.Router();
const {User,BlogPost} = require("../../models");

router.get("/", async (req,res) => {
    BlogPost.findAll({
        include:[User]
    }).then(blogData=>{
        const plainData = blogData.map(blog=>blog.get({plain:true}));
        console.log(plainData);
        res.render("home",{
            allBlogs:plainData,
            logged_in: req.session.logged_in
        })
    })
})