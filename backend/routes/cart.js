const router = require('express').Router();
let Cart = require('../models/cart.model');
const requireLogin = require('../middleware/requireLogin')
const mongoose = require('mongoose');
let Product = require('../models/product.model')

router.post('/add',requireLogin,(req,res)=>{

    const {prId,qunt} = req.body
    const cart = new Cart({
        prId,
        usId:req.user._id,
        qunt,
    })
    cart.save().then(result=>{
        res.json({cart:result})
    })
    .catch(err=>{
        console.log(err)
    })
})


module.exports = router