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
exports.uploadImages = exports.getResponsesOfEntity = exports.getResponseBasedOnEntityId = exports.getResponseWithQuestions = exports.createResponse = void 0;
const yup = __importStar(require("yup"));
const mongoose_1 = require("mongoose");
const responseUtils_1 = require("../utils/responseUtils");
const response_1 = require("../validations/response");
const feedbackResponse_1 = __importDefault(require("../db/models/feedbackResponse"));
const businessAdmin_1 = require("../db/models/businessAdmin");
const utils_1 = require("../utils");
//create response
const createResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const businessAdminId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { templateId } = req.params;
        const formData = req.body;
        console.log(formData);
        yield (0, response_1.validateResponseSchema)(formData);
        yield feedbackResponse_1.default.create(Object.assign({ template: new mongoose_1.Types.ObjectId(templateId) }, formData));
        console.log(formData, businessAdminId, templateId);
        console.log(JSON.stringify(formData, null, 2));
        return (0, responseUtils_1.buildResponse)(res, "Template feedback response added successfully", 200);
    }
    catch (error) {
        console.log(error);
        if (error instanceof yup.ValidationError && (error === null || error === void 0 ? void 0 : error.errors)) {
            // If there's a validation error, send the error response
            const errorMessage = ((_b = error.errors) === null || _b === void 0 ? void 0 : _b.join(', ')) || 'Validation Error';
            return (0, responseUtils_1.buildErrorResponse)(res, errorMessage, 400);
        }
        else {
            return (0, responseUtils_1.buildErrorResponse)(res, 'Internal server error', 500);
        }
    }
});
exports.createResponse = createResponse;
const getResponseWithQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { responseId } = req.params;
        // Fetch the response by its ID
        const response = yield feedbackResponse_1.default.findById(responseId).populate('template');
        if (!response) {
            return (0, responseUtils_1.buildErrorResponse)(res, 'Response not found', 404);
        }
        const templateResponse = (0, utils_1.mapQuestionResponses)(response.template.sections, response.sectionResponse);
        return (0, responseUtils_1.buildObjectResponse)(res, {
            templateName: response.template.templateName,
            authorId: response.authorId,
            authorName: response.authorName,
            entityName: response.entityName,
            entityId: response.entityId,
            templateResponse,
        });
    }
    catch (error) {
        console.error('Error fetching response:', error);
        return (0, responseUtils_1.buildErrorResponse)(res, 'Internal Server Error', 500);
    }
});
exports.getResponseWithQuestions = getResponseWithQuestions;
const getResponseBasedOnEntityId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { serviceId } = req.params;
        const businessAdminId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
        const businessAdminTemplate = yield businessAdmin_1.BusinessAdmin.findOne({
            businessAdminId, templateServiceCategoryId: new mongoose_1.Types.ObjectId(serviceId),
            'templates.active': true
        });
        if (!businessAdminTemplate) {
            return (0, responseUtils_1.buildResponse)(res, 'Template is not active', 200);
        }
        const activeTemplate = businessAdminTemplate === null || businessAdminTemplate === void 0 ? void 0 : businessAdminTemplate.templates.find((item) => item.active === true);
        const templateId = activeTemplate === null || activeTemplate === void 0 ? void 0 : activeTemplate.id;
        console.log(templateId);
        const matchCriteria = templateId ? { template: new mongoose_1.Types.ObjectId(templateId) } : {};
        const responseGroups = yield feedbackResponse_1.default.aggregate([
            {
                $match: matchCriteria,
            },
            {
                $sort: { createdAt: -1 },
            },
            {
                $group: {
                    _id: '$entityId',
                    entityId: { $first: '$entityId' },
                    entityName: { $first: '$entityName' },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                },
            },
        ]);
        return (0, responseUtils_1.buildObjectResponse)(res, { templateId, responseGroups });
    }
    catch (error) {
        console.error('Error fetching response:', error);
        return (0, responseUtils_1.buildErrorResponse)(res, 'Internal Server Error', 500);
    }
});
exports.getResponseBasedOnEntityId = getResponseBasedOnEntityId;
const getResponsesOfEntity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { entityId, templateId } = req.params;
        // Fetch the response by its ID
        const response = yield feedbackResponse_1.default.find({ entityId, template: templateId }, { sectionResponse: 0,
            template: 0, entityId: 0, updatedAt: 0 });
        if (!response) {
            return (0, responseUtils_1.buildErrorResponse)(res, 'Response not found', 404);
        }
        return (0, responseUtils_1.buildObjectResponse)(res, response);
    }
    catch (error) {
        console.error('Error fetching response:', error);
        return (0, responseUtils_1.buildErrorResponse)(res, 'Internal Server Error', 500);
    }
});
exports.getResponsesOfEntity = getResponsesOfEntity;
const uploadImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return (0, responseUtils_1.buildErrorResponse)(res, 'File is not uploaded', 500);
        }
        const serverURL = 'http://127.0.0.1:3000';
        const fileURL = `${serverURL}/uploads/${req.file.filename}`;
        return (0, responseUtils_1.buildObjectResponse)(res, { url: fileURL });
    }
    catch (error) {
        console.error('Error fetching response:', error);
        return (0, responseUtils_1.buildErrorResponse)(res, 'Internal Server Error', 500);
    }
});
exports.uploadImages = uploadImages;
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtYW4uc2hhaEBleGFtcGxlLmNvbSIsInJvbGUiOiIyIiwiaWQiOiIyIiwiYnVzaW5lc3NDYXRlZ29yeSI6IjEiLCJleHAiOjE2OTU4MTI3NjF9.5Q5rN08DNedqH2Ppja4wK-__GXl6I320wenlc2mLVCI
// [
//     { 
//         id: 1,
//         title: 1,
//         questionAnswer: [
//             { 
//                 id: 1,
//                 answerFormat: __,
//                 answer: __,
//                 required: true/false
//             }
//         ]
//     },
//     {}
// ]
