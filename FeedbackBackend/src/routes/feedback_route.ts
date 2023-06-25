import express from "express";
const router = express.Router();

import { createFeedback, deleteFeedback,getFeedbacksByDate, getFeedbacks, getPoductFeedbacks, get_feedback, updateFeedback  } from "../controller/feedback-controller";
import { Validate, validateSchema }  from "../middlewares/validations/schema-validations";
import { verifyToken } from "../middlewares/auth/jwt_auth";

// router.use(verifyToken);
router.get("/product/:product_id", getPoductFeedbacks);
router.post("/getFeedbacksByDate", getFeedbacksByDate);
router.get("/", getFeedbacks);
router.get("/:id", get_feedback);


router.post(
    "/", 
    Validate.checkFeedback, 
    validateSchema, 
    createFeedback 
    );

router.put(
    "/:id", 
    Validate.checkFeedback, 
    validateSchema, 
    updateFeedback 
    );    

router.delete("/:id" , deleteFeedback);

export default router;