const router = require('express').Router();
let Cart = require('../models/cart.model');
const requireLogin = require('../middleware/requireLogin')
const mongoose = require('mongoose');
let Product = require('../models/product.model')
let Address = require('../models/address.model')

router.post('/add',requireLogin,(req,res)=>{

    const {addname,fn,ln,addi1,addi2,ctry,pvince,district,sdistrict,pstcode,phnum} = req.body
    const address = new Address({
        usId:req.user._id,
        addname,
        fn,
        ln,
        addi1,
        addi2,
        ctry,
        pvince,
        district,
        sdistrict,
        pstcode,
        phnum
    })
    address.save().then(result=>{
        res.json({address:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/get',requireLogin,(req,res)=>{

    Address.find({usId:req.user._id})
    .then(product=>res.json(product))
    .catch(err => res.status(400).json('Error: '+ err))
})

router.get('/find/:id',(req,res)=>{
    Address.find({_id:req.params.id})
    .then(address=>res.json(address))
    .catch(err => res.status(400).json('Error: '+ err))

})

module.exports = router