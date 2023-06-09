"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const feedback_template_controller_1 = require("../controller/feedback_template_controller");
const schema_validations_1 = require("../middlewares/validations/schema-validations");
const jwt_auth_1 = require("../middlewares/auth/jwt_auth");
router.get("/", feedback_template_controller_1.getTemplates);
// new template
router.post("/", jwt_auth_1.verifyToken, schema_validations_1.Validate.checkFeedbackTemplate, schema_validations_1.validateSchema, feedback_template_controller_1.createTemplate);
//update template
router.put("/:id", schema_validations_1.Validate.checkFeedbackTemplate, schema_validations_1.validateSchema, feedback_template_controller_1.updateTemplate);
router.delete("/:id", jwt_auth_1.verifyToken, feedback_template_controller_1.deleteTemplate);
exports.default = router;
