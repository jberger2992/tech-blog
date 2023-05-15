const express = require('express');
const router = express.Router();
const {User,BlogPost} = require("../../models");
// api/blogposts

// Get all blogposts
router.get("/", async(req, res) => {
    try{
        const blogposts = await BlogPost.findAll({
            include:[User]
        });
        if(blogposts.length === 0){
            return res.status(404).json({msg:"Zero blogposts in database."})
        }
        res.json(blogposts)
    } catch(err){
        console.loge(err);
        res.status(500).json({msg:"Error",err})
    }
});

// Create new blogpost
router.post("/",(req,res)=>{
    if(!req.session.sessUserId){
        return res.status(403).json({msg:"Must be logged in to post."})
    } 
    BlogPost.create({
        name:req.body.name,
        description:req.body.description,
        UserId:req.session.sessUserId
    }).then(newBlog=>{
        res.json(newBlog)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error",err})
    })
});

// Delete a blogpost by id
router.delete("/:id",(req,res)=>{
    BlogPost.destroy({
        where:{
            id:req.params.id
        }
    }).then(delBlogPost=>{
        if(!delBlogPost){
            return res.status(404).json({msg:"No blog post with that id in database."})
        }
        res.json(delBlogPost)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error",err})
    })
});

module.exports = router;