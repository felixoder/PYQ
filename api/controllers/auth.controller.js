// this is for test
import {errorHandler} from "../utils/error.js";
import User from "../models/auth.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const  SignUp = async (req, res, next)=>{
    const {username,password,email} = req.body;
    if(!username || !email || !password || username === '' || password === '' || email === ''){
        next(errorHandler(400,'All fields are required'));

    }
    const hashedPassword = await bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username,
        password: hashedPassword,
        email
    })
    try{
        await newUser.save();
        res.json("Signed up successfully");
    }
    catch(err){
        next(err);
    }



}

export const SignIn = async(req, res, next)=>{
    const {email , password} = req.body;
    if(!email || !password || email === '' || password === ''){
        next(errorHandler(400,'All fields are required'));
    }
    try{
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404,'User not found'));
        }
        const validPassword = bcryptjs.compareSync(password , validUser.password);
        if(!validPassword){
            return next(errorHandler(404,'Invalid password'));
        }
        const token = jwt.sign(
            {
                id: validUser._id, isAdmin: validUser.isAdmin
            },
            process.env.SECRET
        );
        const {password: pass, ...rest} = validUser._doc;
        res.status(200)
            .cookie('access_token',token,{
                httpOnly: true
            })
            .json(rest)


    }
    catch(error){
        next(error)
    }
}

export const Google =async(req,res,next)=>{
    const {email , name,googlePhotoUrl} = req.body;
    try{
        const user = await User.findOne({email});
        if(user){
            const token = jwt.sign({id:user._id},process.env.SECRET);
            const {password,...rest} = user._doc;
            res.status(200).cookie('access_token',token,{
                httpOnly: true,
            }).json(rest);
        }
        else{
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username:
                    name.toLowerCase().split(' ').join('') +
                    Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id , isAdmin: newUser.isAdmin}, process.env.SECRET);
            const { password, ...rest } = newUser._doc;
            res
                .status(200)
                .cookie('access_token', token, {
                    httpOnly: true,
                })
                .json(rest);
        }
    }
    catch(err){
        next(err);
    }
}
export const signout = (req, res, next) => {
    try {
      res
        .clearCookie("access_token")
        .status(200)
        .json("User has been signed out");
    } catch (error) {
      next(error);
    }
  };