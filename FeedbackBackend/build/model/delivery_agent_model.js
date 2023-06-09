"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Delivery Agent schema
const deliveryAgentSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    client_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Client', required: true },
    user_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    product_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true },
});
// Delivery Agent model
const DeliveryAgent = (0, mongoose_1.model)('DeliveryAgent', deliveryAgentSchema);
exports.default = DeliveryAgent;
