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