"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FeedbackSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User'
    },
    deliveryagent_id: {
        type: mongoose_1.Types.ObjectId,
        ref: 'DeliveryAgent'
    },
    client_id: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Client'
    },
    product_id: {
        type: Number
    },
    template_id: {
        type: mongoose_1.Types.ObjectId,
        ref: 'FeedbackTemplate'
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String
    },
    feedback_type: {
        type: Number
    },
    feedback_language: {
        type: Number
    },
    additional_fields: {
        type: Map,
        of: mongoose_1.Schema.Types.Mixed
    },
    qas: {
        type: Map,
        of: mongoose_1.Schema.Types.Mixed
    },
}, { timestamps: true, versionKey: false });
const FeedbackModel = (0, mongoose_1.model)('Feedback', FeedbackSchema);
exports.default = FeedbackModel;
// {
//   "user_id": "123",
//   "deliveryagent_id": "456",
//   "client_id": "789",
//   "product_id": "001",
//   "template_id": "xyz",
//   "rating": 4,
//   "comment": "I really liked the product!",
//   "feedback_type": "positive",
//   "feedback_language": "english",
//   "additional_fields": {
//     "quantity": 2,
//     "delivery_experience": "good",
//     "product_support_experience": "excellent"
//   },
//   "qa_answers": {
//     "Q1": "The quality of the product was excellent!",
//     "Q2": "The delivery experience was good."
//   }
// }
