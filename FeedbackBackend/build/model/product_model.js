"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Product schema
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    client_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Client', required: true },
}, { versionKey: false, timestamps: false });
// Product model
const Product = (0, mongoose_1.model)('Product', productSchema);
exports.default = Product;
