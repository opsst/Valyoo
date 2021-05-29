const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types

const postSchema = new Schema({
    star:{
        type:Number,
        required:true
    },
    describe:{
        type:String,
    },
    postedBy:{
        type:ObjectId,
        ref:"User"
    }
})

const Post = mongoose.model('Post',postSchema);

module.exports = Post;