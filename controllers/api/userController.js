const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const {User,BlogPost} = require("../../models");
// api/users

// Get all Users
router.get("/",(req,res)=>{
    User.findAll({
        include:[Deck]
    }).then(user=>{
        if(user.length===0){
            return res.status(404).json({msg:"No users found."})
        }
        res.json(user)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"ERROR",err})
    })
});

//Get Specific User by ID
router.get("/:id",(req,res)=>{
    User.findByPk(req.params.id,{
        include:[BlogPost]
    }).then(user=>{
        if(!user){
            return res.status(404).json({msg:"No user with that id exists."})
        }
        res.json(user)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"ERROR",err})
    })
});

// Create a new User
router.post("/", (req, res) => {
    User.create({
      name: req.body.name,
      password: req.body.password,
    })
    .then((newProfile) => {
        res.json(newProfile);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "ERROR", err });
    });
});

// Delete User by ID
router.delete("/:id",(req,res)=>{
    User.destroy({
        where:{
            id:req.params.id
        }
    }).then(delUser=>{
        if(!delUser){
            return res.status(404).json({msg:"No User with this id."})
        }
        res.json(delUser)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"ERROR",err})
    })
});

// Login
router.post("/login", (req, res) => {
    User.findOne({
      where: {
        name: req.body.name,
      },
    })
    .then((selectedUser) => {
        if(!selectedUser){
          return res.status(401).json({msg:"Invalid Username/Password"})
        }
        if(bcrypt.compareSync(req.body.password,selectedUser.password)){
            console.log(selectedUser);
            req.session.sessUserId = selectedUser.id;
            req.session.sessUserName = selectedUser.name;
            req.session.loggedIn = true;
          return res.json(selectedUser);
        } else {
          return res.status(401).json({msg:"Invalid Username/Password"})
        }
      })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "ERROR", err });
      });
});

// Logout
router.post("/logout",(req,res)=>{
    req.session.destroy();
    res.json(req.session);
  })

module.exports = router;