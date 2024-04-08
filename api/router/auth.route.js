import express from 'express'
import {SignUp , SignIn,Google, signout} from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/signup',SignUp);
router.post('/signin',SignIn);
router.post('/google',Google)
router.post('/sign-out',signout)

export default router;