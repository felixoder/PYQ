import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import authRoutes from './router/auth.route.js'
import postRoutes from './router/post.route.js'
import cookieParser from 'cookie-parser'
import path from 'path';
const app = express();
app.use(express.json());
app.use(cookieParser());
const __dirname = path.resolve();
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("MongoDB Connected");
})

app.get('/test',(req,res)=>{
    res.json("This is for test")
})
app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes);
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'client','dist','index.html'))
})
app.listen(process.env.PORT,()=>{
    console.log(`App is running on port ${process.env.PORT}`)
})
