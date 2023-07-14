"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const QASchema = new mongoose_1.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
    },
}, { _id: false });
const FeedbackSchema = new mongoose_1.Schema({
    user_id: {
        type: String,
        ref: 'User'
    },
    deliveryagent_id: {
        type: Number
    },
    client_id: {
        type: Number
    },
    product_id: {
        type: Number,
        required: true,
    },
    template_id: {
        type: mongoose_1.Types.ObjectId,
        ref: 'FeedbackTemplate',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
    },
    feedback_type: {
        type: String,
        required: true,
    },
    feedback_language: {
        type: String,
        required: true,
    },
    additional_fields: {
        type: Map,
        of: mongoose_1.Schema.Types.Mixed,
    },
    qas: [QASchema],
}, { timestamps: true, versionKey: false });
const FeedbackModel = (0, mongoose_1.model)('Feedback', FeedbackSchema);
exports.default = FeedbackModel;
