import express from 'express'
const router = express.Router();

import { userSignup, user_login, getUser } from '../controller/user_controller';

router.post("/signup", userSignup);
router.post("/login" , user_login);
router.get("/:id", getUser);
export default router;