import express from "express";
const router = express.Router();

import { createtemplate, getTemplates, updateTemplate, deleteTemplate } from "../controller/feedback_template_controller";
import { Validate , validateSchema }  from "../middlewares/validations/schema-validations";
import { verifyToken } from "../middlewares/auth/jwt_auth";


router.get("/", getTemplates);

// new template
router.post(
    "/",
    verifyToken,
    Validate.checkFeedbackTemplate,
    validateSchema,
    createtemplate
    );

//update template
router.put(
    "/:id",
    Validate.checkFeedbackTemplate, 
    validateSchema,
    updateTemplate
    );

router.delete("/:id", verifyToken,  deleteTemplate);

export default router;