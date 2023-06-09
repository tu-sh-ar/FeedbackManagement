"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// feedback response model when client makes a response 
const mongoose_1 = require("mongoose");
const feedbackResponseSchema = new mongoose_1.Schema({
    feedback_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Feedback',
        required: true,
    },
    response: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
}, { versionKey: false });
const FeedbackResponse = (0, mongoose_1.model)('FeedbackResponse', feedbackResponseSchema);
exports.default = FeedbackResponse;
