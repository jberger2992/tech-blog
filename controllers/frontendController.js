const express = require('express');
const router = express.Router();
const {User,BlogPost} = require("../models");

// Route to render the homepage
router.get("/", async (req,res) => {
    BlogPost.findAll({
        include:[User]
    }).then(blogData=>{
        const plainData = blogData.map(blog=>blog.get({plain:true}));
        console.log(plainData);
        res.render("home",{
            allBlogs:plainData,
            loggedIn: req.session.loggedIn
        })
    })
})

// Route to render the login page
router.get("/login", async (req,res) => {
    try {
      if (req.session.sessUserId) {
        res.redirect("/")
      } else {
        res.render("login")
      }  
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "ERROR", err });
      }
  })

// Route to render the user dashboard
router.get("/dashboard", async (req,res) => {
  try {
    if (!req.session.sessUserId) {
      res.redirect("/")
    }
    const userData = await User.findByPk(req.session.sessUserId, {
      include:[BlogPost]
    })
    const user = userData.get({plain: true})
    console.log(user)
    return res.render("dashboard", {...user})
  }catch (err) {
    console.log(err)
    res.status(500).json({ msg: "ERROR", err });
  }
})

module.exports = router;