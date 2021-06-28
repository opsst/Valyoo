const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    pname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3},
    pprice: {
        type: Number,
        required: true,
        trim: true,
        minlength: 3
    },
    pdesc: {
        type: String,
        required: true,
        trim: true,
    },
    pquan: [{
        type: Array,
        required: true,
        trim: true,
    }],
    ptype:{
        type:String,
        required: true,
    },
    pdivn: 
        {type : String,
        required : true,}
    ,
    psex:{
        type: String,
        required:true,
    },
    pbrand: {
        type: String,
        required:true
    },
    pimg:[{
        type: Array
    }],
    ptcolor:[{
        type: String
    }]
    
    //ชื่อ ราคา descrip quantity  category
},{
    timestamps: true.valueOf,
});

const Product = mongoose.model('Product',productSchema);

module.exports = Product;