"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const constants_1 = require("../../constants/constants");
const FeedbackCategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    creationType: {
        type: Number,
        enum: [constants_1.TemplateType.CUSTOM, constants_1.TemplateType.DEFAULT],
        required: true,
    },
    businessCategoryId: {
        type: Number,
        required: true,
    },
    businessAdminId: {
        type: Number,
        required: false,
    },
}, { timestamps: true, versionKey: false, });
const FeedbackCategory = mongoose_1.default.model('FeedbackCategories', FeedbackCategorySchema);
exports.default = FeedbackCategory;
