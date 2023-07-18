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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSwapQuestionsMiddleware = exports.validateSectionsMiddleware = void 0;
const yup = __importStar(require("yup"));
const responseUtils_1 = require("../../utils/responseUtils");
const utils_1 = require("../../utils");
const questionRequestSchema = yup.object().shape({
    questionId: yup.number().integer().required(),
    newOrder: yup.number().integer().required(),
});
const sectionsSchema = yup.array().of(yup.object().shape({
    sectionId: yup.number().integer().required(),
    newOrder: yup.number().integer().required(),
})).test('isContiguous', 'newOrder values must be contiguous integers starting from 1', function (sections) {
    const newOrders = sections ? sections.map((section) => section.newOrder) : [];
    return (0, utils_1.areContiguousIntegersStartingFromOne)(newOrders);
});
function validateSectionsMiddleware(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sectionsSchema.validate(req.body);
            next();
        }
        catch (error) {
            if (error instanceof yup.ValidationError && (error === null || error === void 0 ? void 0 : error.errors)) {
                const errorMessage = ((_a = error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || 'Validation Error';
                (0, responseUtils_1.buildErrorResponse)(res, errorMessage, 400);
            }
            else {
                (0, responseUtils_1.buildErrorResponse)(res, 'Interval server error', 500);
            }
        }
    });
}
exports.validateSectionsMiddleware = validateSectionsMiddleware;
const validateSwapQuestionsMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { sectionId, questions } = req.body;
        const parsedSectionId = parseInt(sectionId);
        if (isNaN(parsedSectionId)) {
            (0, responseUtils_1.buildErrorResponse)(res, 'Invalid sectionId format', 400);
        }
        if (!Array.isArray(questions) || questions.length === 0) {
            (0, responseUtils_1.buildErrorResponse)(res, 'Questions must be a non-empty array', 500);
        }
        const newOrders = [];
        for (const question of questions) {
            yield questionRequestSchema.validate(question);
            newOrders.push(question.newOrder);
        }
        if (!(0, utils_1.areContiguousIntegersStartingFromOne)(newOrders)) {
            (0, responseUtils_1.buildErrorResponse)(res, 'newOrder values must be contiguous integers starting from 1', 500);
        }
        next();
    }
    catch (error) {
        if (error instanceof yup.ValidationError && (error === null || error === void 0 ? void 0 : error.errors)) {
            const errorMessage = ((_a = error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || 'Validation Error';
            (0, responseUtils_1.buildErrorResponse)(res, errorMessage, 400);
        }
        else {
            (0, responseUtils_1.buildErrorResponse)(res, 'Interval server error', 500);
        }
    }
});
exports.validateSwapQuestionsMiddleware = validateSwapQuestionsMiddleware;
