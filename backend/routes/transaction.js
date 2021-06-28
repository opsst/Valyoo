const router = require('express').Router();
// let Transaction = require('..models/transaction.model')
let Transaction = require('../models/transaction.model')
let Cart = require('../models/cart.model');
const requireLogin = require('../middleware/requireLogin')
const mongoose = require('mongoose');
let Product = require('../models/product.model')

router.post('/add',requireLogin,(req,res)=>{

    const {crAr,add,payMet} = req.body
    const transaction = new Transaction({
        crAr,
        usId:req.user._id,
        add,
        payMet
    })
    transaction.save().then(result=>{
        res.json({transaction:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/get/:id',(req,res)=>{
    Transaction.find({_id:req.params.id})
    .then(tran=>res.json(tran))
    .catch(err => res.status(400).json('Error: '+ err))
})




module.exports = router