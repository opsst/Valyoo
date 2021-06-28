const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types
const addressSchema = new Schema({
    usId:{
        type:ObjectId,
        ref:"User"
    },
    addname:{
        type:String,
        required: true
        
    },
    fn:{
        type:String,
        required: true
    },
    ln:{
        type:String,
        required: true
    },
    addi1:{
        type:String,
        required: true
    },
    addi2:{
        type:String,
    },
    ctry:{
        type:String,
        required: true

    },
    
    pvince:{
        type:String,
        required: true

    },
    district:{
        type:String,
        required: true

    },
    sdistrict:{
        type:String,
        required: true

    },
    pstcode:{
        type:String,
        required: true

    },
    phnum:{
        type:String,
        required: true

    }

},{
    timestamps: true.valueOf,
});

const Address = mongoose.model('Address',addressSchema);

module.exports = Address;