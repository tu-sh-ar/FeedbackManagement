"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const feedback_controller_1 = require("../controller/feedback-controller");
const schema_validations_1 = require("../middlewares/validations/schema-validations");
// router.use(verifyToken);
router.get("/deliveryAgentFeedback/:agent_id", feedback_controller_1.getDeliveryAgentFeedbacks);
router.get("/getAllFeedbacks", feedback_controller_1.getAllFeedbacks); //testing 
router.get("/getFeedbacksByDate", feedback_controller_1.getFeedbacksByDate);
router.get("/product/:product_id", feedback_controller_1.getPoductFeedbacks);
router.get("/", feedback_controller_1.getFeedbacks);
router.get("/:id", feedback_controller_1.get_feedback);
router.post("/", schema_validations_1.Validate.checkFeedback, schema_validations_1.validateSchema, feedback_controller_1.createFeedback);
router.post("/deliveryFeedback", schema_validations_1.Validate.checkDeliveryFeedback, schema_validations_1.validateSchema, feedback_controller_1.createDeliveryAgentFeedbacks);
router.put("/:id", schema_validations_1.Validate.checkFeedback, schema_validations_1.validateSchema, feedback_controller_1.updateFeedback);
router.delete("/:id", feedback_controller_1.deleteFeedback);
exports.default = router;
