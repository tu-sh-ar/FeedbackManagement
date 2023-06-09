import express from 'express'
const router = express.Router();

import { create_Response, deleteResponse, getResponse, createMissingResponse } from '../controller/feedback_response_controller'
import { verifyToken } from '../middlewares/auth/jwt_auth';

//router.use(verifyToken);

router.get("/" , getResponse)

router.post(
    "/", 
    create_Response
   )

router.post("/createAutoResponse", createMissingResponse);
router.delete("/:id", deleteResponse);


export default router