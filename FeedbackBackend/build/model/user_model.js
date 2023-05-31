"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// User schema
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
}, { versionKey: false, timestamps: false });
// User model
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
