const router = require('express').Router();
let User = require('../models/register.model');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys');
const requireLogin = require('../middleware/requireLogin')

router.get('/protected',requireLogin,(req,res)=>{
    res.json(req.user.firstname)
})

router.route('/').get((req,res)=>{
    User.find()
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: '+ err));
});


router.route('/register').post((req,res)=>{

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password,saltRounds)
    .then(hashpass=>{
        const newUser = new User({
            firstname,
            lastname,
            email,
            password:hashpass
        });
    
        
    
        newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));

    });
});

router.post('/tocart',requireLogin,(req,res)=>{
    User.findByIdAndUpdate((req.params.id),{$push:{cart:"kkkk"}})
    .then(product=>res.json(product))
    // const {star,describe} = req.body
    // if(!star || !describe){
    //     return res.status(422).json({error:"Please add all the fields"})
    // }
    // req.user.password = undefined
    // const post = new Post({
    //     star,
    //     describe,
    //     postedBy:req.user
    // })
    // post.save().then(result=>{
    //     res.json({post:result})
    // })
    // .catch(err=>{
    //     console.log(err)
    // })
})

// router.route('/:id/up').post((req,res)=>{
//     Product.findByIdAndUpdate((req.params.id),{$push:{pimg:"kkkkkkk"}})
//     .then(product=>res.json(product))
// });


router.post('/signin',(req,res)=>{
    const {email,password}  = req.body
    if(!email || !password){
        return res.status(422).json({error:"Please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                res.json({token})
            }
            else{
            return res.status(422).json({error:"Invalid Email or password"})
            }
            
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

module.exports = router;