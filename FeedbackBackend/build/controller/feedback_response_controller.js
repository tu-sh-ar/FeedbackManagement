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
exports.updateResponse = exports.createMissingResponse = exports.getResponse = exports.deleteResponse = exports.create_Response = void 0;
const feedback_response_model_1 = __importDefault(require("../model/feedback_response_model"));
const feedback_model_1 = __importDefault(require("../model/feedback_model"));
const constants_1 = require("../constants/constants");
// create response 
const create_Response = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { feedback_id, response } = req.body;
        // Check if required fields are present
        if (!feedback_id || !response) {
            res.status(400).json({ error: constants_1.status_codes[400] });
            return;
        }
        // Check if feedback exists
        const feedbackExists = yield feedback_model_1.default.exists({ _id: feedback_id });
        if (!feedbackExists) {
            res.status(404).json({ error: constants_1.status_codes[404] });
            return;
        }
        // Save the feedback response
        const feedbackResponse = yield feedback_response_model_1.default.create({ feedback_id, response });
        res.status(201).json(feedbackResponse);
    }
    catch (error) {
        res.status(500).json({ error: constants_1.status_codes[500] });
    }
});
exports.create_Response = create_Response;
// Delete Response
const deleteResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response_id = req.params.id;
        if (!response_id) {
            res.status(400).json({ error: constants_1.status_codes[400] });
            return;
        }
        const response = yield feedback_response_model_1.default.findByIdAndDelete(response_id);
        if (!response) {
            res.status(404).json({ error: constants_1.status_codes[404] });
            return;
        }
        res.status(200).json({ message: constants_1.status_codes[200] });
    }
    catch (error) {
        res.status(404).json({ error: constants_1.status_codes[404] });
    }
});
exports.deleteResponse = deleteResponse;
// Get Response by Feedback ID
const getResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const feedback_id = req.query.feedback_id;
        if (!feedback_id) {
            res.status(400).json({ error: constants_1.status_codes[400] });
            return;
        }
        const response_data = yield feedback_response_model_1.default.findOne({ feedback_id });
        if (!response_data) {
            res.status(404).json({ error: constants_1.status_codes[404] });
            return;
        }
        res.status(200).json(response_data);
    }
    catch (error) {
        res.status(404).json({ error: constants_1.status_codes[404] });
    }
});
exports.getResponse = getResponse;
// generate automatic  response 
const createMissingResponse = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const feedbacks = yield feedback_model_1.default.find();
        for (const feedback of feedbacks) {
            const response = yield feedback_response_model_1.default.findOne({ feedback_id: feedback._id });
            let generatedResponse;
            if (feedback.rating > 3) {
                generatedResponse = constants_1.auto_response.good;
            }
            else {
                generatedResponse = constants_1.auto_response.inconvinient;
            }
            if (!response) {
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                if (JSON.stringify(feedback.createdAt) < JSON.stringify(sevenDaysAgo)) {
                    yield feedback_response_model_1.default.create({ feedback_id: feedback._id, response: generatedResponse });
                }
            }
        }
        console.log(constants_1.status_codes[200]);
    }
    catch (error) {
        console.error(constants_1.status_codes[500], error);
    }
});
exports.createMissingResponse = createMissingResponse;
//update feedback response 
const updateResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response_data = req.body;
    const response_id = req.params.id;
    try {
        const data = yield feedback_response_model_1.default.findByIdAndUpdate(response_id, response_data);
        res.status(200).send(data);
    }
    catch (error) {
        res.status(400).json({ error: constants_1.status_codes[400] });
    }
});
exports.updateResponse = updateResponse;
