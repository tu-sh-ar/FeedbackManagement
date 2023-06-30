import express from "express";
const router = express.Router();

import { createFeedback, deleteFeedback,getFeedbacksByDate, getFeedbacks, getPoductFeedbacks, get_feedback, updateFeedback, getAllFeedbacks, getDeliveryAgentFeedbacks, createDeliveryAgentFeedbacks  } from "../controller/feedback-controller";
import { Validate, validateSchema }  from "../middlewares/validations/schema-validations";
import { verifyToken } from "../middlewares/auth/jwt_auth";

// router.use(verifyToken);
router.get("/deliveryAgentFeedback/:agent_id", getDeliveryAgentFeedbacks);
router.get("/getAllFeedbacks", getAllFeedbacks);        //testing 
router.get("/getFeedbacksByDate", getFeedbacksByDate);
router.get("/product/:product_id", getPoductFeedbacks);
router.get("/", getFeedbacks);
router.get("/:id", get_feedback);


router.post(
    "/", 
    Validate.checkFeedback, 
    validateSchema, 
    createFeedback 
    );

router.post(
    "/deliveryFeedback",
    Validate.checkDeliveryFeedback,
    validateSchema,
    createDeliveryAgentFeedbacks
     )

router.put(
    "/:id", 
    Validate.checkFeedback, 
    validateSchema, 
    updateFeedback 
    );    

router.delete("/:id" , deleteFeedback);

export default router;