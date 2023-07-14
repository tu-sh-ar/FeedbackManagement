"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes for feedback_category_controller api
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const feedback_template_category_controller_1 = require("../controller/feedback_template_category_controller");
const jwt_auth_1 = require("../middlewares/auth/jwt_auth");
router.get("/", jwt_auth_1.verifyToken, feedback_template_category_controller_1.getTemplateById);
router.get("/getFeedbackTemplates", jwt_auth_1.verifyToken, feedback_template_category_controller_1.getFeedbackTemplates);
router.post("/createFeedbackTemplates", feedback_template_category_controller_1.createCategoryTemplate);
router.put("/updateFeedbackTemplate/:template_id", feedback_template_category_controller_1.updateCategoryTemplate);
router.delete("/deleteFeedbackTemplate/:template_id", feedback_template_category_controller_1.deleteCategoryTemplate);
exports.default = router;
