const router = require('express').Router();
let Product = require('../models/product.model');
const requireLogin = require('../middleware/requireLogin')
const mongoose = require('mongoose')

router.get('/all',(req,res)=>{
    Product.find()
    .then(prod=>{
        res.json({prod})
    })
    .catch(err=>{
        console.log(err)
    })

})

router.route('/:id').get((req,res) =>{
    Product.findById(req.params.id)
    .then(product=>res.json(product))
    .catch(err => res.status(400).json('Error: '+ err))
});

// router.route('/:id/up').post((req,res)=>{
//     Product.findByIdAndUpdate((req.params.id),{$push:{pimg:"kkkkkkk"}})
//     .then(product=>res.json(product))
// });

router.post('/add',(req,res)=>{
    const {pname,pprice,pdesc,pquan,pdivn,pbrand,pimg,ptquan,ptype,psex} = req.body
    // if(!star || !describe){
    //     return res.status(422).json({error:"Please add all the fields"})
    // }
    const prod = new Product({
        pname,pprice,pdesc,pquan,pdivn,pbrand,pimg,ptquan,ptype,psex
    })
    prod.save().then(result=>{
        res.json('added!')
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router