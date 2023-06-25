import express from 'express'
const router = express.Router();

import { create_Response, deleteResponse, getResponse, createMissingResponse, updateResponse } from '../controller/feedback_response_controller'
import { verifyToken } from '../middlewares/auth/jwt_auth';
import { Validate, validateSchema } from '../middlewares/validations/schema-validations';
//router.use(verifyToken);

router.get("/" , getResponse)

router.post(
    "/", 
    Validate.checkResponse,
    validateSchema,
    create_Response
   )

router.put(
    "/:id",
    Validate.checkResponse,
    validateSchema,
    updateResponse
    )

router.post("/createAutoResponse", createMissingResponse);
router.delete("/:id", deleteResponse);


export default router