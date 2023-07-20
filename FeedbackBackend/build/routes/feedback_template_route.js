"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const feedback_template_controller_1 = require("../controller/feedback_template_controller");
const jwt_auth_1 = require("../middlewares/auth/jwt_auth");
const request_body_validations_1 = require("../middlewares/validations/request-body-validations");
//fetching default templates
router.get("/getDefaultBusinessCategoryTemplates/:businessCategoryId", 
// verifyToken,
feedback_template_controller_1.getDefaultBusinessCategoryTemplates);
//fetching business admin templates
router.get("/getBusinessAdminTemplates/:businessCategory", jwt_auth_1.verifyToken, feedback_template_controller_1.getBusinessAdminTemplates);
//fetch template
router.get("/getTemplateById/:templateId", jwt_auth_1.verifyToken, feedback_template_controller_1.getTemplateById);
//fetch template
router.get("/getTemplateByFeebackCategoryId/:feedbackTypeId", jwt_auth_1.verifyToken, feedback_template_controller_1.getTemplateByFeebbackCategoryId);
// new template
router.post("/create", jwt_auth_1.verifyToken, feedback_template_controller_1.createTemplate);
// update template
router.put("/update/:templateId", jwt_auth_1.verifyToken, feedback_template_controller_1.updateTemplate);
//swap sections
router.put("/swapSection/:templateId", jwt_auth_1.verifyToken, request_body_validations_1.validateSectionsMiddleware, feedback_template_controller_1.swapSections);
//swap question
router.put("/swapQuestion/:templateId", jwt_auth_1.verifyToken, request_body_validations_1.validateSwapQuestionsMiddleware, feedback_template_controller_1.swapQuestions);
//activate feedback
router.put("/api/feedbackTemplate/activateTemplate/:businessAdminId", jwt_auth_1.verifyToken, feedback_template_controller_1.activateTemplate);
//delete template
router.delete("/deleteTemplate/:id", jwt_auth_1.verifyToken, feedback_template_controller_1.deleteTemplate);
exports.default = router;
