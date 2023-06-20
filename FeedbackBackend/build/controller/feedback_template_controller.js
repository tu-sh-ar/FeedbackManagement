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
exports.deleteTemplate = exports.updateTemplate = exports.createTemplate = exports.getTemplates = void 0;
const feedback_template_model_1 = __importDefault(require("../model/feedback_template_model"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// get feedback templates 
exports.getTemplates = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const client_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        // fetching data basis of client Id
        const templates = yield feedback_template_model_1.default.find({ client_id: client_id });
        if (templates.length)
            res.status(200).send(templates);
        else
            res.status(404).json({ error: 'No feedback templates found' });
    }
    catch (error) {
        res.status(500).json({ error: `Error in fetching templates: ${error}` });
    }
}));
// create new feedback template 
exports.createTemplate = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        const client_id = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        const feedback_template_data = req.body;
        if (!client_id || !feedback_template_data) {
            res.status(400).json({ error: 'Bad Request: Missing required fields' });
            return;
        }
        if (((_c = req.user) === null || _c === void 0 ? void 0 : _c.role) === "admin") {
            const new_data = Object.assign(Object.assign({}, feedback_template_data), { client_id });
            // Create a new template for feedback
            const createdTemplate = yield feedback_template_model_1.default.create(new_data);
            res.status(200).json(createdTemplate);
        }
    }
    catch (error) {
        res.status(500).json({ error: `Error in creating template: ${error}` });
    }
}));
// update template 
exports.updateTemplate = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const template_id = req.params.id;
    const template_data = req.body;
    if (template_data.client_id) {
        res.status(401).json({ error: "client id cannot be updated" });
    }
    try {
        yield feedback_template_model_1.default.findByIdAndUpdate(template_id, template_data)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(404).json({ error: "No feedback template found" }));
    }
    catch (error) {
        res.status(500).send({ error: "Error occured in updating the template" });
    }
}));
// delete a template 
exports.deleteTemplate = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const template_id = req.params.id;
    try {
        feedback_template_model_1.default.findByIdAndDelete(template_id)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(404).json({ error: "No template exist with the given id" }));
    }
    catch (error) {
        res.status(500).json({ error: `Template not deleted` });
    }
}));
// {
//     "type": 1,
//     "fields": {
//       "quantity": "number",
//       "missing items": "number"
//     },
//     "requiredFields": {
//       "rating": true,
//       "feedback_type": false,
//       "feedback_language": false
//     },
//     "qas": {
//       "Q1": "How was the delivery experience of the product?",
//       "Q2": "Did the product meet your expectations?",
//       "Q3": "What improvements would you suggest for the product?"
//     }
//   }
//   {
//     "type": 2,
//     "fields": {
//       "response time": "number",
//       "customer support": "string"
//     },
//     "requiredFields": {
//       "rating": true,
//       "feedback_type": false,
//       "feedback_language": false
//     },
//     "qas": {
//          "Q1": "How would you rate the professionalism of our staff?",
//          "Q2": "Did our customer support team resolve your issue effectively?",
//          "Q3": "What improvements would you suggest for our services?"
//         }
//   }
