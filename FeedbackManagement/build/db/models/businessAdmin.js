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
exports.BusinessAdmin = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const templateSchema = new mongoose_1.Schema({
    id: {
        type: mongoose_1.Types.ObjectId,
        ref: 'FeedbackTemplate',
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: false
    },
    used: {
        type: Boolean,
        required: true,
        default: false
    },
    lastActivatedTimestamp: {
        type: Date,
        required: false
    },
}, { _id: false });
const BusinessAdminSchema = new mongoose_1.Schema({
    businessAdminId: {
        type: Number,
        required: true,
    },
    templateServiceCategoryId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'FeedbackCategories',
        required: true,
    },
    templates: {
        type: [templateSchema],
        default: [],
    }
}, { timestamps: true, versionKey: false, });
exports.BusinessAdmin = mongoose_1.default.model('BusinessAdmin', BusinessAdminSchema);
