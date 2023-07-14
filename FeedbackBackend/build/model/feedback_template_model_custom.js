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
const answerFormat_enum_1 = require("../middlewares/enums/answerFormat_enum");
const AnswerFormatSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true,
        enum: answerFormat_enum_1.FieldTypes
    },
    required: {
        type: Boolean,
        required: true,
    },
    options: {
        type: [String],
        required: false,
        default: undefined
    },
    upperBound: {
        type: Number,
        required: false,
    }
}, { _id: false, minimize: true });
const QuestionAnswerFormFieldSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        required: true,
    },
    answerFormat: {
        type: AnswerFormatSchema,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, { _id: false });
const FeedbackFormatSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        required: true,
    },
    questions: {
        type: [QuestionAnswerFormFieldSchema],
        default: [],
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true,
    }
}, { _id: false });
const FeedbackTemplateSchema = new mongoose_1.Schema({
    templateType: {
        type: Number,
        enum: [answerFormat_enum_1.TemplateType.CUSTOM, answerFormat_enum_1.TemplateType.DEFAULT],
        required: true,
    },
    feedbackType: {
        type: mongoose_1.Types.ObjectId,
        ref: 'FeedbackCategory',
        required: true,
    },
    defaultTemplateId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'FeedbackDefaultTemplates',
    },
    templateName: {
        type: String,
        required: true,
    },
    businessCategory: {
        type: Number,
        required: false,
    },
    sections: {
        type: [FeedbackFormatSchema],
        default: [],
    },
    businessAdminId: {
        type: Number,
        required: false,
    },
    isActive: {
        type: Boolean,
        default: false
    },
    used: {
        type: Boolean,
        default: false
    }
}, { timestamps: true, versionKey: false, });
const FeedbackTemplate = mongoose_1.default.model('FeedbackCustomTemplate', FeedbackTemplateSchema);
exports.default = FeedbackTemplate;
