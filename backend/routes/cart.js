const router = require('express').Router();
let Cart = require('../models/cart.model');
const requireLogin = require('../middleware/requireLogin')
const mongoose = require('mongoose');
let Product = require('../models/product.model')

router.post('/add',requireLogin,(req,res)=>{

    const {prId,prAr,qunt,prcolor,prsize} = req.body
    const cart = new Cart({
        prId,
        prAr,
        usId:req.user._id,
        qunt,
        prcolor,
        prsize,
    })
    cart.save().then(result=>{
        res.json({cart:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/:id',requireLogin,(req,res) =>{
    Cart.find({usId:req.params.id})
    .then(product=>res.json(product))
    .catch(err => res.status(400).json('Error: '+ err))
});

router.delete('/:id',requireLogin,(req,res)=>{
    Cart.findByIdAndDelete(req.params.id)
    .then(()=> res.json('Deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.delete('/clear/:id',(req,res)=>{
    Cart.deleteMany({"usId":req.params.id})
    .then((cart)=>res.json(cart))
    .catch(err => res.status(400).json('Error: '+ err))
    // Cart.findByIdAndDelete(req.params.id)
    // .then(()=> res.json('Deleted'))
    // .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/:id',(req,res)=>{
    Cart.findByIdAndUpdate(req.params.id,{ prAr:req.body })
    .then(()=>res.json('Update'))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/q/:id',(req,res)=>{
    Cart.findByIdAndUpdate(req.params.id,{qunt:req.body.qunt})
    .then(()=>res.json('Change'))
    .catch(err => res.status(400).json('Error: ' + err));
})

// router.route('/:id').get((req,res) =>{
//     Cart.findById(req.params.id)
//     .then(cart=>res.json(cart))
//     .catch(err => res.status(400).json('Error: '+ err))
// });



module.exports = router