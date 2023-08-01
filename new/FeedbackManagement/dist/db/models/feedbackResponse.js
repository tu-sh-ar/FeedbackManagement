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
const AnswerFormFieldSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true,
    },
    answer: {
        type: mongoose_1.Schema.Types.Mixed,
        required: true
    },
}, { _id: false });
const FeedbackResponseFormatSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true,
    },
    questions: {
        type: [AnswerFormFieldSchema],
        default: [],
    },
}, { _id: false });
const TemplateResponseSchema = new mongoose_1.Schema({
    template: {
        type: mongoose_1.Types.ObjectId,
        ref: 'FeedbackTemplate',
        required: true,
    },
    authorId: {
        type: String,
        required: true,
    },
    authorName: {
        type: String,
        required: false,
    },
    entityId: {
        type: String,
        required: true,
    },
    entityName: {
        type: String,
    },
    sectionResponse: {
        type: [FeedbackResponseFormatSchema],
        default: [],
    },
}, { timestamps: true, versionKey: false, });
const FeedbackTemplateResponse = mongoose_1.default.model('TemplateResponse', TemplateResponseSchema);
exports.default = FeedbackTemplateResponse;
//example
const response = {
    customerId: '11111111',
    entityId: '111111111',
    entityName: '11111111111',
    customerName: 'amait',
    sectionResponse: [
        {
            id: 1,
            question: [
                {
                    id: 1,
                    answer: "Not good"
                }
            ]
        }
    ]
};
