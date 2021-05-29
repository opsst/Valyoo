const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3},
    lastname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    cart:[{
        type: String,
    }],
    transaction:[{
        type: String,
    }]
    
},{
    timestamps: true.valueOf,
});

const User = mongoose.model('User',userSchema);

module.exports = User;