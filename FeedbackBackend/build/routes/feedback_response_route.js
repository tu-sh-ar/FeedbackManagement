"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const feedback_response_controller_1 = require("../controller/feedback_response_controller");
//router.use(verifyToken);
router.get("/", feedback_response_controller_1.getResponse);
router.post("/", feedback_response_controller_1.create_Response);
router.post("/createAutoResponse", feedback_response_controller_1.createMissingResponse);
router.delete("/:id", feedback_response_controller_1.deleteResponse);
exports.default = router;
