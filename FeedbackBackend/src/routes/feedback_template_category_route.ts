// routes for feedback_category_controller api
import express from "express";
const router = express.Router();
import { Validate , validateSchema }  from "../middlewares/validations/schema-validations";
import { getFeedbackTemplates, createCategoryTemplate, updateCategoryTemplate, deleteCategoryTemplate, getTemplateById } from "../controller/feedback_template_category_controller";
import { verifyToken } from "../middlewares/auth/jwt_auth";


router.get("/", verifyToken, getTemplateById);
router.get("/getFeedbackTemplates", verifyToken, getFeedbackTemplates);
router.post("/createFeedbackTemplates", createCategoryTemplate);
router.put("/updateFeedbackTemplate/:template_id", updateCategoryTemplate);
router.delete("/deleteFeedbackTemplate/:template_id", deleteCategoryTemplate);

export default router