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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTemplate = exports.activateTemplate = exports.updateTemplate = exports.createTemplate = exports.swapQuestions = exports.swapSections = exports.getTemplateById = exports.getBusinessAdminTemplates = exports.allotDefaultTemplatesToBusinessAdmin = exports.getDefaultBusinessCategoryTemplates = void 0;
const feedback_template_model_1 = __importDefault(require("../model/feedback_template_model"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const constants_1 = require("../constants/constants");
const dynamic_feedback_form_validation_1 = require("../middlewares/validations/dynamic-feedback-form-validation");
const answerFormat_enum_1 = require("../middlewares/enums/answerFormat_enum");
const yup = __importStar(require("yup"));
const feedback_template_model_default_1 = __importDefault(require("../model/feedback_template_model_default"));
const mongoose_1 = __importStar(require("mongoose"));
//fetches default templates bases on business category
exports.getDefaultBusinessCategoryTemplates = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { businessCategoryId } = req.params;
        if (!Number.isInteger(parseInt(businessCategoryId, 10))) {
            res.status(400).json({ error: 'Invalid businessCategoryId' });
        }
        const templatesByCategory = {};
        const aggregateResult = yield feedback_template_model_default_1.default.aggregate([
            {
                $lookup: {
                    from: 'feedbackcategory',
                    localField: 'feedbackType',
                    foreignField: '_id',
                    as: 'feedbackType',
                },
            },
            {
                $unwind: '$feedbackType',
            },
            {
                $match: {
                    businessCategory: parseInt(businessCategoryId, 10),
                },
            },
            {
                $group: {
                    _id: '$feedbackType.name',
                    templates: {
                        $push: {
                            id: '$_id',
                            templateName: '$templateName',
                            businessCategory: '$businessCategory',
                            sections: '$sections',
                            isActive: '$isActive',
                        },
                    },
                    feedbackType: {
                        $first: {
                            id: '$feedbackType._id',
                            name: '$feedbackType.name'
                        },
                    },
                },
            },
        ]);
        aggregateResult.forEach((result) => {
            templatesByCategory[result._id] = {
                templates: result.templates,
                feedbackType: result.feedbackType
            };
        });
        res.status(200).json({ templatesByCategory });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Allot default templates to business admin on registration
exports.allotDefaultTemplatesToBusinessAdmin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { businessAdminId, businessCategoryId } = req.params;
        // Find the default templates based on the provided businessCategoryId
        const defaultTemplates = yield feedback_template_model_default_1.default.find({ businessCategory: businessCategoryId });
        const templates = defaultTemplates.map((defaultTemplate) => ({
            templateName: defaultTemplate.templateName,
            templateType: answerFormat_enum_1.TemplateType.DEFAULT,
            feedbackType: defaultTemplate.feedbackType,
            businessCategory: defaultTemplate.businessCategory,
            sections: defaultTemplate.sections,
            businessAdminId: parseInt(businessAdminId, 10),
            defaultTemplateId: defaultTemplate._id,
            used: 0,
            isActive: false,
        }));
        yield feedback_template_model_1.default.insertMany(templates);
        res.status(200).json({ message: 'Templates alloted successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
//fetches default templates bases on business category
exports.getBusinessAdminTemplates = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { businessAdminId } = req.params;
        if (!Number.isInteger(parseInt(businessAdminId, 10))) {
            res.status(400).json({ error: 'Invalid businessAdminId' });
        }
        const templatesByCategory = {};
        const aggregateResult = yield feedback_template_model_1.default.aggregate([
            {
                $match: {
                    $or: [
                        { businessAdminId: parseInt(businessAdminId, 10) },
                        { templateType: answerFormat_enum_1.TemplateType.DEFAULT, feedbackType: { $exists: true } }
                    ]
                }
            },
            {
                $lookup: {
                    from: 'feedbackcategory',
                    localField: 'feedbackType',
                    foreignField: '_id',
                    as: 'feedbackType',
                },
            },
            {
                $unwind: '$feedbackType',
            },
            {
                $group: {
                    _id: {
                        feedbackTypeName: '$feedbackType.name',
                        isDefaultTemplate: { $eq: ['$templateType', answerFormat_enum_1.TemplateType.DEFAULT] }
                    },
                    templates: {
                        $push: {
                            id: '$_id',
                            templateType: '$templateType',
                            templateName: '$templateName',
                            isActive: '$isActive',
                        },
                    },
                    feedbackType: {
                        $first: {
                            id: '$feedbackType._id',
                            name: '$feedbackType.name'
                        },
                    },
                },
            },
            {
                $sort: { '_id.isDefaultTemplate': -1 },
            },
            {
                $group: {
                    _id: '$_id.feedbackTypeName',
                    templates: {
                        $push: '$templates',
                    },
                    feedbackType: {
                        $first: '$feedbackType'
                    }
                },
            },
        ]);
        aggregateResult.forEach((result) => {
            templatesByCategory[result._id] = {
                templates: result.templates.flat(),
                feedbackType: result.feedbackType
            };
        });
        res.status(200).json({ templatesByCategory });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Fetches a single template based on templateId with sorted questions and sections
exports.getTemplateById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { templateId } = req.params;
        const template = yield feedback_template_model_1.default.findById(templateId);
        if (!template) {
            res.status(404).json({ error: 'Template not found' });
            return;
        }
        // Sort sections and questions based on their order
        template.sections.sort((a, b) => a.order - b.order);
        template.sections.forEach((section) => {
            section.questions.sort((a, b) => a.order - b.order);
        });
        const _a = template.toObject(), { _id } = _a, templateData = __rest(_a, ["_id"]);
        res.status(200).json(Object.assign({ id: _id }, templateData));
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.swapSections = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { templateId } = req.params;
        const { sectionId1, sectionId2 } = req.body;
        // Validate and transform the templateId parameter
        const parsedTemplateId = parseInt(templateId);
        // Check if the transformation was successful
        if (isNaN(parsedTemplateId)) {
            res.status(400).json({ error: 'Invalid templateId format' });
        }
        // Find the template by ID
        const template = yield feedback_template_model_1.default.findById(parsedTemplateId);
        // Check if the template exists
        if (!template) {
            res.status(404).json({ error: 'Template not found' });
            return;
        }
        // Find the sections by their IDs
        const section1 = template.sections.find((section) => section.id === sectionId1);
        const section2 = template.sections.find((section) => section.id === sectionId2);
        // Check if the sections exist
        if (!section1 || !section2) {
            res.status(404).json({ error: 'Section not found' });
            return;
        }
        // Swap the order of the sections
        const tempOrder = section1.order;
        section1.order = section2.order;
        section2.order = tempOrder;
        // Save the updated template
        yield template.save();
        res.status(200).json({ message: 'Section order swapped successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.swapQuestions = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { templateId, sectionId } = req.params;
        const { questionId1, questionId2 } = req.body;
        const parsedTemplateId = parseInt(templateId);
        const parsedSectionId = parseInt(sectionId);
        if (isNaN(parsedTemplateId) || isNaN(parsedSectionId)) {
            res.status(400).json({ error: 'Invalid templateId or sectionId format' });
        }
        const template = yield feedback_template_model_1.default.findById(parsedTemplateId);
        let section;
        if (!template) {
            res.status(404).json({ error: 'Template not found' });
        }
        else {
            section = template.sections.find((section) => section.id === parsedSectionId);
        }
        if (!section) {
            res.status(404).json({ error: 'Section not found' });
        }
        const question1 = section.fields.find((field) => field.id === questionId1);
        const question2 = section.fields.find((field) => field.id === questionId2);
        if (!question1 || !question2) {
            res.status(404).json({ error: 'Question not found' });
        }
        const tempOrder = question1.order;
        question1.order = question2.order;
        question2.order = tempOrder;
        // Save the updated template
        if (template)
            yield template.save();
        res.status(200).json({ message: 'Question order swapped successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
const validateAndTransformForm = (roleId, businessAdminId, formData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, dynamic_feedback_form_validation_1.validateFormSchema)(formData);
        const convertToAnswerFormat = (answerFormat) => {
            const convertedFormat = {
                type: answerFormat.type,
                required: answerFormat.required,
            };
            if (answerFormat.options) {
                convertedFormat.options = answerFormat.options;
            }
            if (answerFormat.upperBound) {
                convertedFormat.upperBound = answerFormat.upperBound;
            }
            return convertedFormat;
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
                    questions: convertToQuestionAnswerFormField(format.fields),
                };
                return convertedFormat;
            });
        };
        const convertToFeedbackTemplate = (feedbackForm) => {
            let feedbackTemplate = {
                templateName: feedbackForm.feedbackFormName,
                feedbackType: new mongoose_1.Types.ObjectId(feedbackForm.feedbackType),
                sections: convertToFeedbackFormat(feedbackForm.sections),
                isActive: false,
            };
            if (roleId === 2 && businessAdminId) {
                feedbackTemplate = Object.assign(Object.assign({}, feedbackTemplate), { used: false, templateType: answerFormat_enum_1.TemplateType.CUSTOM, businessAdminId: businessAdminId });
            }
            else if (roleId === 1) {
                feedbackTemplate = Object.assign(Object.assign({}, feedbackTemplate), { templateType: answerFormat_enum_1.TemplateType.DEFAULT });
            }
            return feedbackTemplate;
        };
        const feedbackForm = convertToFeedbackTemplate(formData);
        return feedbackForm;
    }
    catch (error) {
        throw error;
    }
});
// create new feedback template 
exports.createTemplate = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d;
    try {
        const businessAdminId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        const roleId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.role;
        const formData = req.body;
        const data = yield validateAndTransformForm(roleId, businessAdminId, formData);
        console.log(JSON.stringify(data, null, 2));
        yield feedback_template_model_1.default.create(data);
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
    var _e, _f, _g;
    try {
        const { templateId } = req.params;
        const templateData = req.body;
        const businessAdminId = (_e = req.user) === null || _e === void 0 ? void 0 : _e.id;
        const roleId = (_f = req.user) === null || _f === void 0 ? void 0 : _f.role;
        // Validate and transform the templateId parameter
        const parsedTemplateId = parseInt(templateId);
        // Check if the transformation was successful
        if (isNaN(parsedTemplateId)) {
            res.status(400).json({ error: 'Invalid templateId format' });
        }
        const existingTemplate = yield feedback_template_model_1.default.findById(parsedTemplateId);
        // Check if the template exists
        if (!existingTemplate) {
            res.status(404).json({ error: 'Template not found' });
        }
        // Check if the template is active
        if (existingTemplate && existingTemplate.used) {
            res.status(400).json({ error: 'Cannot update an in use or used template' });
        }
        const data = yield validateAndTransformForm(roleId, businessAdminId, templateData);
        console.log(JSON.stringify(data, null, 2));
        yield feedback_template_model_1.default.findByIdAndUpdate(parsedTemplateId, templateData, { new: true });
        res.status(200).json({ message: 'Feedback form updated successfully' });
    }
    catch (error) {
        console.log(error);
        if (error instanceof yup.ValidationError && (error === null || error === void 0 ? void 0 : error.errors)) {
            // If there's a validation error, send the error response
            const errorMessage = ((_g = error.errors) === null || _g === void 0 ? void 0 : _g.join(', ')) || 'Validation Error';
            res.status(400).json({ error: errorMessage });
        }
        else {
            res.status(500).json({ error: constants_1.status_codes[500] });
        }
    }
}));
// activating template
exports.activateTemplate = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { businessAdminId } = req.params;
        const { feedbackType, templateId } = req.body;
        const parsedBusinessAdminId = parseInt(businessAdminId);
        const parsedFeedbackType = feedbackType;
        const parsedTemplateId = templateId;
        if (isNaN(parsedFeedbackType)) {
            res.status(400).json({ error: 'Invalid feedbackType format' });
        }
        if (isNaN(parsedBusinessAdminId)) {
            res.status(400).json({ error: 'Invalid businessAdminId format' });
        }
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        try {
            yield feedback_template_model_1.default.updateMany({
                businessAdminId: parsedBusinessAdminId,
                feedbackType: feedbackType,
                isActive: true
            }, { isActive: false }, { session });
            yield feedback_template_model_1.default.findByIdAndUpdate(parsedTemplateId, { isActive: true, used: true }, { session });
            yield session.commitTransaction();
            session.endSession();
            res.json({ message: 'Template activated successfully' });
        }
        catch (error) {
            yield session.abortTransaction();
            session.endSession();
            throw error;
        }
    }
    catch (error) {
        res.status(500).json({ error: constants_1.status_codes[500] });
    }
}));
// delete a template 
exports.deleteTemplate = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { templateId } = req.params;
        const parsedTemplateId = templateId;
        const existingTemplate = yield feedback_template_model_1.default.findById(parsedTemplateId);
        if (!existingTemplate) {
            res.status(404).json({ error: 'Template not found' });
        }
        // Check if the template is active or in use
        if (existingTemplate && existingTemplate.used) {
            res.status(400).json({ error: 'Cannot delete a template in use' });
        }
        // Delete the template
        yield feedback_template_model_1.default.findByIdAndDelete(parsedTemplateId);
        res.json({ message: 'Template deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting template:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
