"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const client_controller_1 = require("../controller/client_controller");
router.post("/signup", client_controller_1.clientSignup);
router.post("/login", client_controller_1.client_login);
exports.default = router;
