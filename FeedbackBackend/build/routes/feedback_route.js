"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const feedback_controller_1 = require("../controller/feedback-controller");
const schema_validations_1 = require("../middlewares/validations/schema-validations");
const jwt_auth_1 = require("../middlewares/auth/jwt_auth");
// router.use(verifyToken);
router.get("/", feedback_controller_1.getFeedbacks);
router.get("/:id", jwt_auth_1.verifyToken, feedback_controller_1.get_feedback);
router.post("/", schema_validations_1.Validate.checkFeedback, schema_validations_1.validateSchema, feedback_controller_1.createFeedback);
router.put("/:id", schema_validations_1.Validate.checkFeedback, schema_validations_1.validateSchema, feedback_controller_1.updateFeedback);
router.delete("/:id", feedback_controller_1.deleteFeedback);
exports.default = router;
