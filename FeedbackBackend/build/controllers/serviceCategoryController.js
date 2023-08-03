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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActiveLinkForTemplate = exports.getServiceCategories = void 0;
const mongoose_1 = require("mongoose");
const responseUtils_1 = require("../utils/responseUtils");
const businessAdmin_1 = require("../db/models/businessAdmin");
const feedbackCategory_1 = __importDefault(require("../db/models/feedbackCategory"));
const utils_1 = require("../utils");
const response_1 = require("../validations/response");
const yup = __importStar(require("yup"));
//create response
const getServiceCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const businessAdminId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const businessCategoryId = req.params.businessCategoryId;
        const categories = yield feedbackCategory_1.default.find({
            $or: [
                { businessCategoryId, creationType: 2 },
                { businessAdminId, creationType: 1 }
            ]
        }).lean();
        const modifiedCategories = categories.map(category => {
            category.id = category._id;
            delete category._id;
            delete category.businessCategoryId;
            return category;
        });
        return (0, responseUtils_1.buildObjectResponse)(res, modifiedCategories);
    }
    catch (error) {
        console.log(error);
        return (0, responseUtils_1.buildErrorResponse)(res, 'Internal server error', 500);
    }
});
exports.getServiceCategories = getServiceCategories;
const getActiveLinkForTemplate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        const serviceId = req.params.serviceId;
        const businessAdminId = req.params.businessAdminId;
        const bodyData = req.body;
        yield (0, response_1.validateLinkBodySchema)(bodyData);
        const existingTemplate = yield businessAdmin_1.BusinessAdmin.findOne({
            'templates.active': true,
            businessAdminId,
            templateServiceCategoryId: new mongoose_1.Types.ObjectId(serviceId),
        }, { _id: 0, 'templates.$': 1 });
        if (!existingTemplate) {
            return (0, responseUtils_1.buildErrorResponse)(res, 'Template is not active', 404);
        }
        const templateObj = (_b = existingTemplate.templates[0]) === null || _b === void 0 ? void 0 : _b.id;
        const link = (0, utils_1.generateUrlWithToken)(templateObj, bodyData);
        return (0, responseUtils_1.buildObjectResponse)(res, link);
    }
    catch (error) {
        console.log(error);
        if (error instanceof yup.ValidationError && (error === null || error === void 0 ? void 0 : error.errors)) {
            const errorMessage = ((_c = error.errors) === null || _c === void 0 ? void 0 : _c.join(', ')) || 'Validation Error';
            return (0, responseUtils_1.buildErrorResponse)(res, errorMessage, 400);
        }
        else {
            return (0, responseUtils_1.buildErrorResponse)(res, 'Internal server error', 500);
        }
    }
});
exports.getActiveLinkForTemplate = getActiveLinkForTemplate;
