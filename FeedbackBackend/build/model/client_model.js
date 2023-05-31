"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Client schema
const clientSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
}, { versionKey: false, timestamps: false });
// Client model
const Client = (0, mongoose_1.model)('Client', clientSchema);
exports.default = Client;
