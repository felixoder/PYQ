import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import authRoutes from './router/auth.route.js'


const app = express();
app.use(express.json());
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("MongoDB Connected");
})

app.get('/test',(req,res)=>{
    res.json("This is for test")
})
app.use('/api/auth',authRoutes);
app.listen(process.env.PORT,()=>{
    console.log(`App is running on port ${process.env.PORT}`)
})