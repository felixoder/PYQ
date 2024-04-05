// this is for test
import {errorHandler} from "../utils/error.js";
import User from "../models/auth.model.js";
import bcryptjs from "bcryptjs";
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
