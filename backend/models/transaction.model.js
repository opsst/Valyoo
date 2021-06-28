const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types
const transactionSchema = new Schema({
    crAr:{
    },
    add:{
    },
    usId:{
        type:ObjectId,
        ref:"User"
    },
    payMet:{
        type:String
    },

},{
    timestamps: true.valueOf,
});

const Transaction = mongoose.model('Transaction',transactionSchema);

module.exports = Transaction;