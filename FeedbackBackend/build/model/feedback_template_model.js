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
const FeedbackTemplateSchema = new mongoose_1.Schema({
    type: {
        type: Number,
        required: true
    },
    fields: {
        type: Map,
        of: String
    },
    requiredFields: {
        type: Map,
        of: Boolean
    },
    qas: {
        type: Map,
        of: String
    },
    client_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true, versionKey: false });
const FeedbackTemplate = mongoose_1.default.model('FeedbackTemplate', FeedbackTemplateSchema);
exports.default = FeedbackTemplate;
// {
//     "name": "Product Feedback Template",
//     "type": "product",
//     "fields": {
//       "quantity": "number",
//       "delivery_experience": "string",
//       "customer_support_experience": "string"
//     },
//     "requiredFields": {
//       "rating": true,
//       "comment": true,
//       "feedback_type": false,
//       "feedback_language": false
//     },
//     "qas": {
//       "Q1": "What do you think about the quality of the product?",
//       "Q2": "How was your experience with the delivery of the product?"
//     }
