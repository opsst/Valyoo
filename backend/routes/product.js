const router = require('express').Router();
let Product = require('../models/product.model');
const requireLogin = require('../middleware/requireLogin')
const mongoose = require('mongoose')

router.get('/all',(req,res)=>{
        Product.find()
        .sort({pname:1})
        .then(prod=>{
            res.json({prod})
        })
        .catch(err=>{
            console.log(err)
        })



})
// router.get('/alldes',(req,res)=>{
//     Product.find()
//     .sort({pname:-1})
//     .then(prod=>{
//         res.json({prod})
//     })
//     .catch(err=>{
//         console.log(err)
//     })


// })

// router.get('/all/sort',(req,res)=>{
//     Product.find()
//     .sort({pname:1})
//     .then(prod=>{
//         res.json({prod})
//     })
//     .catch(err=>{
//         console.log(err)
//     })

// })

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
    const {pname,pprice,pdesc,pquan,pdivn,pbrand,pimg,ptype,psex,ptcolor} = req.body
    // if(!star || !describe){
    //     return res.status(422).json({error:"Please add all the fields"})
    // }
    const prod = new Product({
        pname,pprice,pdesc,pquan,pdivn,pbrand,pimg,ptype,psex,ptcolor
    })
    prod.save().then(result=>{
        res.json('added!')
    })
    .catch(err=>{
        console.log(err)
    })
})

// router.post('/all/filter',(req,res)=>{
//     Product.find(req.body)
//     .then(product=>res.json(product))
//     .catch(err => res.status(400).json('Error: '+ err))
// })
router.get('/all/:filter',(req,res)=>{

        
        let x= req.params.filter.split('-')

        let y=[]
        let Valuepsex ={}
        let Valuepdivn ={}
        let Valuepbrand = []
        let Valueprice = {}

        for(let i=0;i<x.length;i++){
           y[i]=x[i].split('|')

        }
        // res.json(y)
        for(let l=0;l<y.length;l++){

            if(y[l][0]==="men"&&y[l][1]==="women"){
                Valuepsex = {$or:[{psex:"men"},{psex:"women"}]}
               }
               else if(y[l][0]==="men"){
                Valuepsex = {psex:"men"}
               }
               else if(y[l][0]==="women"){
                Valuepsex = {psex:"women"}
               }
               if(y[l][0]==="shoes"||y[l][0]==="clothing"||y[l][0]==="accessories"){
                    if(y[l][0]==="shoes"&&y[l][0+1]==="clothing"&&y[l][0+2]==="accessories"){
                        Valuepdivn={$or:[{pdivn:"shoes"},{pdivn:"clothing"},{pdivn:"accessories"}]}
                    }else if(y[l][0]==="shoes"&&y[l][0+1]==="clothing"){
                        Valuepdivn={$or:[{pdivn:"shoes"},{pdivn:"clothing"}]}
                    }
                    else if(y[l][0]==="shoes"&&y[l][0+1]==="accessories"){
                        Valuepdivn={$or:[{pdivn:"shoes"},{pdivn:"accessories"}]}
                    }
                    else if(y[l][0]==="clothing"&&y[l][0+1]==="accessories"){
                        Valuepdivn={$or:[{pdivn:"clothing"},{pdivn:"accessories"}]}
                    }
                    else if(y[l][0]==="shoes"){
                        Valuepdivn={pdivn:"shoes"}
                    }
                    else if(y[l][0]==="clothing"){
                        Valuepdivn={pdivn:"clothing"}
                    }
                    else if(y[l][0]==="accessories"){
                        Valuepdivn={pdivn:"accessories"}
                    }

            }
                if(y[l][0]==="adidas"||y[l][0]==="nike"||y[l][0]==="new_balance"||y[l][0]==="fila"||y[l][0]==="under_armour"||y[l][0]==="puma"){
                    if(y[l][0]==="adidas"&&y[l][1]==="nike"&&y[l][2]==="new_balance"&&y[l][3]==="fila"&&y[l][4]==="under_armour"&&y[l][5]==="puma"){
                        Valuepbrand={$or:[{pbrand:"adidas"},{pbrand:"nike"},{pbrand:"new_balance"},{pbrand:"fila"},{pbrand:"under_armour"},{pbrand:"puma"}]}
                    } else{
                        let ram = [{}]
                        for(let m=0; m<y[l].length;m++){
                            ram = [{"pbrand":y[l][m]}]
                            let combine = [...Valuepbrand,...ram]
                            
                            Valuepbrand = combine
                            
                            // let obj1 = JSON.parse(Valuepbrand)

                            // let obj2 = JSON.parse(ram)

                            // let merged = {
                            //     obj1,
                            //     obj2
                            // }
                            // Valuepbrand = JSON.stringify(merged)
                        }
                        
                       
                    }
                    
                    // else if(y[l][0]==="adidas"&&y[l][0]==="nike"&&y[l][0]==="new_balance"&&y[l][0]==="fila"&&y[l][0]==="under_armour"&&y[l][0]==="puma"){
                    //     Valuepbrand={$or:[{pbrand:"adidas"},{pbrand:"nike"},{pbrand:"new_balance"},{pbrand:"fila"},{pbrand:"under_armour"},{pbrand:"puma"}]}
                    // }
                }else{
                    Valuepbrand = []
                }


                if(y[l][0]==="lt15"||y[l][0]==="ld30"||y[l][0]==="ld45"||y[l][0]==="ld60"||y[l][0]==="ld75"||y[l][0]==="md75"){
                    if(y[l][0]==="lt15"){
                        Valueprice = {pprice:{$lte:1500}}
                    }
                    else if(y[l][0]==="ld30"){
                        Valueprice = {pprice:{$gte:1500,$lte:3000}}
                    }
                    else if(y[l][0]==="ld45"){
                        Valueprice = {pprice:{$gte:3000,$lte:4500}}
                    }
                    else if(y[l][0]==="ld60"){
                        Valueprice = {pprice:{$gte:4500,$lte:6000}}
                    }
                    else if(y[l][0]==="ld75"){
                        Valueprice = {pprice:{$gte:6000,$lte:7500}}
                    }
                    else if(y[l][0]==="md75"){
                        Valueprice = {pprice:{$gte:7500}}
                    }
                }
                
        }
        if(Valuepbrand.length === 0){
            Valuepbrand = {}
        }
        else{
            Valuepbrand = {"$or":Valuepbrand}
            
        }
        // res.json(Valuepbrand)
            if(y[0][0]==="t1"){
                Product.find({
                    $and:[
                    Valuepsex,
                    Valuepdivn,
                    Valuepbrand,
                    Valueprice
                ]})
                .sort({createdAt:-1})
                .then(product=>res.json(product))
                .catch(err => res.status(400).json('Error: '+ err))
            }
            else if(y[0][0]==="t2"){
                Product.find({
                    $and:[
                    Valuepsex,
                    Valuepdivn,
                    Valuepbrand,
                    Valueprice
                ]})
                .sort({createdAt:1})
                .then(product=>res.json(product))
                .catch(err => res.status(400).json('Error: '+ err))
            }
            else if(y[0][0]==="t3"){
                // res.json(y[0][0])
                Product.find({
                    $and:[
                    Valuepsex,
                    Valuepdivn,
                    Valuepbrand,
                    Valueprice
                ]})
                .sort({pprice:-1})
                .then(product=>res.json(product))
                .catch(err => res.status(400).json('Error: '+ err))
            }
            else if(y[0][0]==="t4"){
                Product.find({
                    $and:[
                    Valuepsex,
                    Valuepdivn,
                    Valuepbrand,
                    Valueprice
                ]})
                .sort({pprice:1})
                .then(product=>res.json(product))
                .catch(err => res.status(400).json('Error: '+ err))
            }
        else{Product.find({
            $and:[
            Valuepsex,
            Valuepdivn,
            Valuepbrand,
            Valueprice
            // {pprice:{$gte:4500,$lte:6000}}
        ]}).then(product=>res.json(product))
        .catch(err => res.status(400).json('Error: '+ err))}
        // res.json()
        
    

        // let y= req.params.filter.split('|')
        // let y = str.s
        // let z= {$or:[{psex:req.params.filter},{psex:"women"}]}

        // res.json(Valuepsex)
 

    // // .where('pprice').equals(4600)
    
})

module.exports = router