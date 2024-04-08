import mongoose from 'mongoose';
const postSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    pdf:{
        type:String,
        required:true,

    },
    year:{
        type:String,
        required:true,

    },
    exam:{
        type:String,
        required:true,
        default:'uncategorized'
    },
    board:{
        type:String,
        required:true,
        default:'uncategorized'
    },
    medium:{
        type:String,
        required:true,
        default:'uncategorized'
    },
    subject:{
        type:String,
        required:true,
        default:'uncategorized'
        
    },
   
    author:{
        type:String,
        required:true,

    },
    slug:{
        type:String,
        required:true,
        unique:true
    }

},{timestamps:true});
const Post = mongoose.model('Post', postSchema);
export default Post;
