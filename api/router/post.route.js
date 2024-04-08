import express from 'express';
import {createPost,  getposts} from "../controllers/post.controller.js";
const router = express.Router();
router.post('/create',createPost);
router.get('/getposts',getposts);

export default router;