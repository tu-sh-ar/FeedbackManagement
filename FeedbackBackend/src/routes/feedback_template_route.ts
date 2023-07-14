import express from "express";
const router = express.Router();

import { createTemplate, updateTemplate, deleteTemplate, getDefaultBusinessCategoryTemplates, allotDefaultTemplatesToBusinessAdmin, getBusinessAdminTemplates, swapQuestions, swapSections, getTemplateById, activateTemplate } from "../controller/feedback_template_controller";
import { Validate, validateSchema } from "../middlewares/validations/schema-validations";
import { verifyToken } from "../middlewares/auth/jwt_auth";


//fetching default templates
router.get(
    "/getDefaultBusinessCategoryTemplates/:businessCategoryId",
    // verifyToken,
    getDefaultBusinessCategoryTemplates
);

//allot default templates to business admin
router.post(
    "/allotDefaultTemplatesToBusinessAdmin/:businessAdminId/:businessCategoryId",
    // verifyToken,
    allotDefaultTemplatesToBusinessAdmin
);

//fetching business admin templates
router.get(
    "/getBusinessAdminTemplates/:businessAdminId",
    // verifyToken,
    getBusinessAdminTemplates
);

//fetch template
router.get(
    "/getTemplateById/:templateId",
    verifyToken,
    getTemplateById
);


// new template
router.post(
    "/create",
    verifyToken,
    createTemplate
);

// update template
router.put(
    "/update/:templateId",
    verifyToken,
    updateTemplate
);

//swap sections
router.put(
    "/swapSection/:templateId",
    verifyToken,
    swapSections
);

//swap question
router.put(
    "/swapQuestion/:templateId/:sectionId",
    verifyToken,
    swapQuestions
);

//activate feedback
router.put(
    "/api/feedbackTemplate/activateTemplate/:businessAdminId",
    verifyToken,
    activateTemplate
);
router.delete("/deleteTemplate/:id", verifyToken, deleteTemplate);

export default router;