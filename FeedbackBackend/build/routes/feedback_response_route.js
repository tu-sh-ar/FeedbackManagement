"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const feedback_response_controller_1 = require("../controller/feedback_response_controller");
const schema_validations_1 = require("../middlewares/validations/schema-validations");
//router.use(verifyToken);
router.get("/", feedback_response_controller_1.getResponse);
router.post("/", schema_validations_1.Validate.checkResponse, schema_validations_1.validateSchema, feedback_response_controller_1.create_Response);
router.put("/:id", schema_validations_1.Validate.checkResponse, schema_validations_1.validateSchema, feedback_response_controller_1.updateResponse);
router.post("/createAutoResponse", feedback_response_controller_1.createMissingResponse);
router.delete("/:id", feedback_response_controller_1.deleteResponse);
exports.default = router;
