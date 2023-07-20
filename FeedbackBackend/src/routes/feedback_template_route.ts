import express from "express";
const router = express.Router();

import { createTemplate, updateTemplate, deleteTemplate, getDefaultBusinessCategoryTemplates, 
    getBusinessAdminTemplates, swapQuestions, swapSections, getTemplateById, activateTemplate, getTemplateByFeebbackCategoryId } from "../controller/feedback_template_controller";
import { verifyToken } from "../middlewares/auth/jwt_auth";
import { validateSectionsMiddleware, validateSwapQuestionsMiddleware } from "../middlewares/validations/request-body-validations";


//fetching default templates
router.get(
    "/getDefaultBusinessCategoryTemplates/:businessCategoryId",
    // verifyToken,
    getDefaultBusinessCategoryTemplates
);

//fetching business admin templates
router.get(
    "/getBusinessAdminTemplates/:businessCategory",
    verifyToken,
    getBusinessAdminTemplates
);

//fetch template
router.get(
    "/getTemplateById/:templateId",
    verifyToken,
    getTemplateById
);

//fetch template
router.get(
    "/getTemplateByFeebackCategoryId/:feedbackTypeId",
    verifyToken,
    getTemplateByFeebbackCategoryId
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
    validateSectionsMiddleware,
    swapSections
);

//swap question
router.put(
    "/swapQuestion/:templateId",
    verifyToken,
    validateSwapQuestionsMiddleware,
    swapQuestions
);

//activate feedback
router.put(
    "/api/feedbackTemplate/activateTemplate/:businessAdminId",
    verifyToken,
    activateTemplate
);

//delete template
router.delete("/deleteTemplate/:id", verifyToken, deleteTemplate);

export default router;