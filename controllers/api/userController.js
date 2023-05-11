const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const {User,BlogPost} = require("../../models");

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

// Update a Profile by ID
router.put("/:id",(req,res)=>{
    Profile.update({
        username: req.body.username,
        password: req.body.password,
        score: req.body.score
    },{
        where:{id:req.params.id}
    }).then(editProfile=>{
        if(!editProfile[0]){
            return res.status(404).json({msg:"No profile with that id exists."})
        }
        res.json(editProfile)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"ERROR",err})
    })
});

// Delete Profile by ID
router.delete("/:id",(req,res)=>{
    Profile.destroy({
        where:{
            id:req.params.id
        }
    }).then(delProfile=>{
        if(!delProfile){
            return res.status(404).json({msg:"No profile with this id."})
        }
        res.json(delProfile)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"ERROR",err})
    })
});

// Login
router.post("/login", (req, res) => {
    Profile.findOne({
      where: {
        username: req.body.username,
      },
    })
    .then((selectedProfile) => {
        if(!selectedProfile){
          return res.status(401).json({msg:"Invalid Username/Password"})
        }
        if(bcrypt.compareSync(req.body.password,selectedProfile.password)){
            console.log(selectedProfile);
            req.session.userId = selectedProfile.id;
            req.session.userName=selectedProfile.username;
          return res.json(selectedProfile);
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