import express from 'express'
const router = express.Router();

import { userSignup, user_login } from '../controller/user_controller';

router.post("/signup", userSignup);
router.post("/login" , user_login);

export default router;