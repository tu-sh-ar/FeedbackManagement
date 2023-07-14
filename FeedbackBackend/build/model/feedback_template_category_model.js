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
const buisness_category_enum_1 = require("../middlewares/enums/buisness_category_enum");
const template_type_1 = require("../middlewares/enums/template_type");
const answerFormat_enum_1 = require("../middlewares/enums/answerFormat_enum");
const FeedbackQuestionSchema = new mongoose_1.Schema({
    question: {
        type: String,
        required: true,
    },
    answerFormat: {
        type: String,
        required: true,
        enum: Object.values(answerFormat_enum_1.answerFormat)
    },
}, { _id: false });
const FeedbackCategoryTemplateSchema = new mongoose_1.Schema({
    business_category_type: {
        type: String,
        required: true,
        enum: Object.values(buisness_category_enum_1.CategoryType),
    },
    template_type: {
        type: String,
        required: true,
        enum: Object.values(template_type_1.TemplateType)
    },
    requiredFields: {
        type: Map,
        of: Boolean,
    },
    qas: {
        type: Map,
        of: [FeedbackQuestionSchema]
    },
}, { timestamps: true, versionKey: false });
const FeedbackCategoryTemplates = mongoose_1.default.model('FeedbackCategoryTemplates', FeedbackCategoryTemplateSchema);
exports.default = FeedbackCategoryTemplates;
