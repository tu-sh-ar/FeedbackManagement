"use strict";
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
exports.getTemplateById = exports.deleteCategoryTemplate = exports.updateCategoryTemplate = exports.createCategoryTemplate = exports.getFeedbackTemplates = void 0;
const feedback_template_category_model_1 = __importDefault(require("../model/feedback_template_category_model"));
const constants_1 = require("../constants/constants");
// import { convertToObject } from 'typescript';
// get templates on the basis of business type 
const getFeedbackTemplates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const buisness_type = (_a = req.user) === null || _a === void 0 ? void 0 : _a.businessCategory;
    if (!buisness_type) {
        res.status(400).json({ error: constants_1.status_codes[400] });
    }
    try {
        const templates = yield feedback_template_category_model_1.default.find({ business_category_type: buisness_type });
        if (templates.length === 0) {
            return res.status(404).json({ error: constants_1.status_codes[404] });
        }
        res.status(200).send(templates);
    }
    catch (error) {
        res.status(500).json({ error: constants_1.status_codes[500] });
    }
});
exports.getFeedbackTemplates = getFeedbackTemplates;
// create category wise templates 
const createCategoryTemplate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const template_data = req.body;
        const template = yield feedback_template_category_model_1.default.create(template_data);
        if (Object.keys(template).length === 0) {
            return res.status(400).json({ error: constants_1.status_codes[400] });
        }
        res.status(200).send(template);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.createCategoryTemplate = createCategoryTemplate;
// update a template based on the template id 
const updateCategoryTemplate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const template_id = req.params.template_id;
        const template_data = req.body;
        const update = yield feedback_template_category_model_1.default.findByIdAndUpdate(template_id, template_data);
        if (Object.keys(update ? update : {}).length === 0) {
            return res.status(400).json({ error: constants_1.status_codes[400] });
        }
        res.status(200).send(update);
    }
    catch (error) {
        res.status(500).json({ error: constants_1.status_codes[500] });
    }
});
exports.updateCategoryTemplate = updateCategoryTemplate;
// deleting the category template 
const deleteCategoryTemplate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const template_id = req.params.template_id;
        const del = yield feedback_template_category_model_1.default.findByIdAndDelete(template_id);
        if (Object.keys(del ? del : {}).length === 0) {
            return res.status(400).json({ error: constants_1.status_codes[400] });
        }
        res.status(200).send(constants_1.status_codes[200]);
    }
    catch (error) {
        res.status(500).json({ error: constants_1.status_codes[500] });
    }
});
exports.deleteCategoryTemplate = deleteCategoryTemplate;
// get templates by template id and business_type
const getTemplateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const template_id = req.query.template_id;
        const business = (_b = req.user) === null || _b === void 0 ? void 0 : _b.businessCategory;
        const template = yield feedback_template_category_model_1.default.findOne({ _id: template_id, business_category_type: business });
        // const mappedTemplate = {
        //     _id: template?._id,
        //     business_category_type: template?.business_category_type ? CategoryType[template.business_category_type] : null,
        //     template_type: template?.template_type ? TemplateType[template.template_type] : null,
        //     required_fields: template?.requiredFields,
        //     qas: template?.qas.map(qa => ({
        //       question: qa.question,
        //       answerFormat: qa.answerFormat ? answerFormat[qa.answerFormat] : null,
        //     })),
        //   };
        if (Object.keys(template ? template : {}).length === 0) {
            return res.status(404).json({ error: constants_1.status_codes[404] });
        }
        res.status(200).send(template);
    }
    catch (error) {
        res.status(500).json({ error: constants_1.status_codes[500] });
    }
});
exports.getTemplateById = getTemplateById;
