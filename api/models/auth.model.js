import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required:true,
        unique: true,
    },
    password:{
        type: String,
        required:true,
    },
    profilePicture:{
        type: String,
        default:'https://unsplash.com/photos/a-man-in-a-yellow-shirt-smiling-at-the-camera-ZjDbRtR_BcE'
    },
    isAdmin:{
        type: Boolean,
        default: false
    }

},{timestamps:true});

const User = mongoose.model('User',userSchema);
export default User;