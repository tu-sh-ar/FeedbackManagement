import express from 'express'
const router = express.Router();

import { create_Response } from '../controller/feedback_response_controller'
import { verifyToken } from '../middlewares/auth/jwt_auth';

//router.use(verifyToken);

router.post(
    "/", 
   // ResponseNotification , 
    create_Response
   )

export default router