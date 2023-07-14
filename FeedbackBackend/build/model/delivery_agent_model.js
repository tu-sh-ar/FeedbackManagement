"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
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
// Delivery Agent schema
const deliveryAgentFeedbackSchema = new mongoose_1.Schema({
    template_id: {
        type: mongoose_1.Types.ObjectId,
        ref: 'FeedbackTemplate',
        required: true,
    },
    deliveryagent_id: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    product_id: {
        type: Number
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String
    },
    qas: {
        type: [FeedbackQuestionSchema],
    },
}, { timestamps: true, versionKey: false });
// Delivery Agent model
const DeliveryAgentFeedback = (0, mongoose_1.model)('DeliveryAgentFeedbacks', deliveryAgentFeedbackSchema);
exports.default = DeliveryAgentFeedback;
