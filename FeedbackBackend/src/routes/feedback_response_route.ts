import express from 'express'
const router = express.Router();

import { create_Response, delete_response } from '../controller/feedback_response_controller'
import { verifyToken } from '../middlewares/auth/jwt_auth';

//router.use(verifyToken);

router.post(
    "/", 
   // ResponseNotification , 
    create_Response
   )

router.delete("/:id", delete_response);

export default router