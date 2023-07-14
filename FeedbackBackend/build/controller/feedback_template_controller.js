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
exports.deleteTemplate = exports.updateTemplate = exports.createTemplate = exports.getTemplates = void 0;
const feedback_template_model_1 = __importDefault(require("../model/feedback_template_model"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const constants_1 = require("../constants/constants");
const dynamic_feedback_form_validation_1 = require("../middlewares/validations/dynamic-feedback-form-validation");
const answerFormat_enum_1 = require("../middlewares/enums/answerFormat_enum");
const yup = __importStar(require("yup"));
// get feedback templates 
exports.getTemplates = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const client_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        // fetching data basis of client Id
        const templates = yield feedback_template_model_1.default.find({
            client_id: client_id
        });
        if (templates.length)
            res.status(200).send(templates);
        else
            res.status(404).json({ error: constants_1.status_codes[404] });
    }
    catch (error) {
        res.status(500).json({ error: constants_1.status_codes[500] });
    }
}));
// create new feedback template 
exports.createTemplate = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d;
    try {
        const clientId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        const roleId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.role;
        let parsedRoleId;
        if (typeof roleId === 'string') {
            parsedRoleId = parseInt(roleId, 10);
            if (isNaN(parsedRoleId)) {
                res.status(401).json({ error: 'Unauthorized' });
            }
        }
        else if (typeof roleId !== 'number') {
            res.status(400).json({ error: 'Unauthorized' });
        }
        // Convert clientId to a number if possible
        let parsedClientId;
        if (typeof clientId === 'string') {
            parsedClientId = parseInt(clientId, 10);
            if (isNaN(parsedClientId)) {
                res.status(400).json({ error: 'clientId should be a number or convertible to a number' });
            }
        }
        else if (typeof clientId !== 'number') {
            res.status(400).json({ error: 'clientId should be a number or convertible to a number' });
        }
        const formData = req.body;
        yield (0, dynamic_feedback_form_validation_1.validateFormSchema)(formData);
        const convertToAnswerFormat = (answerFormat) => {
            return answerFormat.map((format) => {
                const convertedFormat = {
                    type: format.type,
                    required: format.required,
                };
                if (format.options) {
                    convertedFormat.options = format.options;
                }
                if (format.upperBound) {
                    convertedFormat.upperBound = format.upperBound;
                }
                return convertedFormat;
            });
        };
        const convertToQuestionAnswerFormField = (fields) => {
            return fields.map((field, index) => {
                const convertedField = {
                    id: index + 1,
                    question: field.question,
                    order: field.order,
                    answerFormat: convertToAnswerFormat(field.answerFormat),
                };
                return convertedField;
            });
        };
        const convertToFeedbackFormat = (formats) => {
            return formats.map((format, index) => {
                const convertedFormat = {
                    id: index + 1,
                    title: format.title,
                    order: format.order,
                    fields: convertToQuestionAnswerFormField(format.fields),
                };
                return convertedFormat;
            });
        };
        const convertToFeedbackTemplate = (feedbackForm) => {
            const feedbackTemplate = {
                templateName: feedbackForm.feedbackFormName,
                templateType: roleId === 1 ? answerFormat_enum_1.TemplateType.DEFAULT : answerFormat_enum_1.TemplateType.CUSTOM,
                businessType: feedbackForm.businessType,
                formats: convertToFeedbackFormat(feedbackForm.formats),
                clientId: parsedClientId,
                isActive: true,
            };
            if (roleId === 2) {
                feedbackTemplate.clientId = parsedClientId;
            }
            return feedbackTemplate;
        };
        const feedbackForm = convertToFeedbackTemplate(formData);
        console.log(JSON.stringify(feedbackForm, null, 2));
        yield feedback_template_model_1.default.create(feedbackForm);
        res.status(200).json({ message: 'Feedback form created successfully' });
    }
    catch (error) {
        console.log(error);
        if (error instanceof yup.ValidationError && (error === null || error === void 0 ? void 0 : error.errors)) {
            // If there's a validation error, send the error response
            const errorMessage = ((_d = error.errors) === null || _d === void 0 ? void 0 : _d.join(', ')) || 'Validation Error';
            res.status(400).json({ error: errorMessage });
        }
        else {
            res.status(500).json({ error: constants_1.status_codes[500] });
        }
    }
}));
// update template 
exports.updateTemplate = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const template_id = req.params.id;
    const template_data = req.body;
    try {
        yield feedback_template_model_1.default.findByIdAndUpdate(template_id, template_data)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(404).json({ error: constants_1.status_codes[404] }));
    }
    catch (error) {
        res.status(500).send({ error: constants_1.status_codes[500] });
    }
}));
// delete a template 
exports.deleteTemplate = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const template_id = req.params.id;
    try {
        yield feedback_template_model_1.default.findByIdAndDelete(template_id)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(404).json({ error: constants_1.status_codes[404] }));
    }
    catch (error) {
        res.status(500).json({ error: constants_1.status_codes[500] });
    }
}));
