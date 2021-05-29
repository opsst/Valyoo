const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types
const cartSchema = new Schema({
    prId:{
        type:ObjectId
    },
    usId:{
        type:ObjectId,
        ref:"User"
    },
    qunt:{
        type:Number
    }
},{
    timestamps: true.valueOf,
});

const Cart = mongoose.model('Cart',cartSchema);

module.exports = Cart;