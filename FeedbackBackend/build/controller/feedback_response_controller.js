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
exports.createMissingResponse = exports.getResponse = exports.deleteResponse = exports.create_Response = void 0;
const feedback_response_model_1 = __importDefault(require("../model/feedback_response_model"));
const feedback_model_1 = __importDefault(require("../model/feedback_model"));
// create response 
const create_Response = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { feedback_id, response } = req.body;
        // Check if required fields are present
        if (!feedback_id || !response) {
            res.status(400).json({ error: 'Bad Request: Missing required fields' });
            return;
        }
        // Check if feedback exists
        const feedbackExists = yield feedback_model_1.default.exists({ _id: feedback_id });
        if (!feedbackExists) {
            res.status(404).json({ error: 'Feedback not found' });
            return;
        }
        // Save the feedback response
        const feedbackResponse = yield feedback_response_model_1.default.create({ feedback_id, response });
        res.status(201).json(feedbackResponse);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.create_Response = create_Response;
// Delete Response
const deleteResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const feedback_id = req.params.id;
        if (!feedback_id) {
            res.status(400).json({ error: 'Bad Request: Missing feedback ID' });
            return;
        }
        const response = yield feedback_response_model_1.default.findByIdAndDelete(feedback_id);
        if (!response) {
            res.status(404).json({ error: 'Response not found' });
            return;
        }
        res.status(200).json({ message: 'Deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.deleteResponse = deleteResponse;
// Get Response by Feedback ID
const getResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const feedback_id = req.query.feedback_id;
        if (!feedback_id) {
            res.status(400).json({ error: 'Bad Request: Missing feedback ID' });
            return;
        }
        const response_data = yield feedback_response_model_1.default.findOne({ feedback_id });
        if (!response_data) {
            res.status(404).json({ error: 'No response found' });
            return;
        }
        res.status(200).json(response_data);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
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
                generatedResponse = "Thank you for your feedback.";
            }
            else {
                generatedResponse = "Sorry for the inconvenience. We will look into the issue.";
            }
            if (!response) {
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                if (JSON.stringify(feedback.createdAt) < JSON.stringify(sevenDaysAgo)) {
                    yield feedback_response_model_1.default.create({ feedback_id: feedback._id, response: generatedResponse });
                }
            }
        }
        console.log("Automatic responses generated successfully.");
    }
    catch (error) {
        console.error("Error in automatic response generation:", error);
    }
});
exports.createMissingResponse = createMissingResponse;
