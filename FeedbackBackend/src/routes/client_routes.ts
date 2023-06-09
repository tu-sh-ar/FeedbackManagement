import express from 'express'
const router = express.Router();

import { clientSignup, client_login } from '../controller/client_controller';

router.post("/signup", clientSignup);
router.post("/login" , client_login);

export default router;