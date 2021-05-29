const router = require('express').Router();
let Post = require('../models/review.model');
const requireLogin = require('../middleware/requireLogin')
const mongoose = require('mongoose')

router.get('/allpost',(req,res)=>{
    Post.find()
    .populate("postedBy","_id firstname")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/createpost',requireLogin,(req,res)=>{
    const {star,describe} = req.body
    if(!star || !describe){
        return res.status(422).json({error:"Please add all the fields"})
    }
    req.user.password = undefined
    const post = new Post({
        star,
        describe,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id firstname")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})
module.exports = router