"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const product_controller_1 = require("../controller/product_controller");
router.get("/:id", product_controller_1.getProduct);
router.post("/", product_controller_1.createProduct);
exports.default = router;
