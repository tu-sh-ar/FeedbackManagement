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
exports.getPoductFeedbacks = exports.get_feedback = exports.deleteFeedback = exports.updateFeedback = exports.createFeedback = exports.getFeedbacks = void 0;
const feedback_model_1 = __importDefault(require("../model/feedback_model"));
const feedback_type_enum_1 = require("../middlewares/enums/feedback_type_enum");
const feedback_template_model_1 = __importDefault(require("../model/feedback_template_model"));
// create a feedback
const getFeedbacks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let updated_feedback = [];
    try {
        // getting feedback using the client id 
        yield feedback_model_1.default.find()
            .then(data => {
            data.forEach(feedback => {
                const new_feedback = {
                    feedback_id: feedback._id,
                    user_id: feedback.user_id,
                    product_id: feedback === null || feedback === void 0 ? void 0 : feedback.product_id,
                    rating: feedback.rating,
                    comment: feedback === null || feedback === void 0 ? void 0 : feedback.comment,
                    review: feedback === null || feedback === void 0 ? void 0 : feedback.additional_fields,
                    QA: feedback === null || feedback === void 0 ? void 0 : feedback.qas,
                    created_at: feedback.createdAt,
                    updated_at: feedback.updatedAt
                };
                updated_feedback.push(new_feedback);
            });
            res.status(200).send(updated_feedback);
        })
            .catch(err => res.status(404).send(err));
    }
    catch (error) {
        res.status(500).send("internal Server error");
    }
});
exports.getFeedbacks = getFeedbacks;
// create a feedback
const createFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const feedback_data = req.body;
    const template_type = (_a = req.body) === null || _a === void 0 ? void 0 : _a.template_type;
    // gettting user credentials 
    // const user_id = req.user?.id;
    try {
        // getting the user_id from the auth 
        const user_id = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id; // auth token payload 
        // const delivery_agent_data = DeliveryAgent.findOne({user_id:user_id})
        // feedback_data.deliveryagent_id = delivery_agent_data._id;
        //searhing for an existing template for the given template type
        const feedback_template = yield feedback_template_model_1.default.findOne({ type: template_type });
        // check if the user exists and then make the response 
        const new_feedback_data = Object.assign(Object.assign({}, feedback_data), { client_id: feedback_template === null || feedback_template === void 0 ? void 0 : feedback_template.client_id, template_id: feedback_template === null || feedback_template === void 0 ? void 0 : feedback_template._id, 
            // user_id:user_id,
            feedback_type: feedback_type_enum_1.feedback_type.UserToClient });
        yield feedback_model_1.default.create(new_feedback_data)
            .then(data => res.status(201).send(data))
            .catch(err => res.status(400).send(err));
    }
    catch (error) {
        res.status(500).send("internal server error");
    }
});
exports.createFeedback = createFeedback;
// create a feedback
const updateFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const feedback_data = req.body;
    const id = req.params.id;
    try {
        feedback_model_1.default.findByIdAndUpdate(id, feedback_data)
            .then(data => res.status(200).send("Feedback Updated Successfully"))
            .catch(err => res.status(404).send("No Feedback Found with the given id "));
    }
    catch (error) {
        res.status(500).send(`Internal Server Error : ${error}`);
    }
});
exports.updateFeedback = updateFeedback;
// delete a feedback
const deleteFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const feedback_id = req.params.id;
    try {
        feedback_model_1.default.findByIdAndDelete(feedback_id)
            .then(data => res.status(200).send("Deleted Feedback"))
            .catch(err => res.status(404).send("No Feedback Found"));
    }
    catch (error) {
        res.status(500).send("Internal Server Error");
    }
});
exports.deleteFeedback = deleteFeedback;
// get feedback by id 
const get_feedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const feedback_id = req.params.id;
    try {
        const data = yield feedback_model_1.default.findById(feedback_id);
        const feedback = JSON.parse(JSON.stringify(data));
        const new_feedback = {
            feedback_id: feedback._id,
            user_id: feedback.user_id,
            product_id: feedback === null || feedback === void 0 ? void 0 : feedback.product_id,
            rating: feedback.rating,
            comment: feedback === null || feedback === void 0 ? void 0 : feedback.comment,
            review: feedback === null || feedback === void 0 ? void 0 : feedback.additional_fields,
            QA: feedback === null || feedback === void 0 ? void 0 : feedback.qas,
            created_at: feedback.createdAt,
            updated_at: feedback.updatedAt
        };
        if (Object.keys(new_feedback).length != 0) {
            res.status(200).send(new_feedback);
        }
        else {
            res.status(404).json({ error: "No Feedback Found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: `Internal Server Error: ${error}` });
    }
});
exports.get_feedback = get_feedback;
// get feedbacks based on product id
const getPoductFeedbacks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product_id = req.query.product_id;
    try {
        const feedbacks = yield feedback_model_1.default.find({ product_id: product_id });
        if (feedbacks.length) {
            const updated_feedbacks = feedbacks.map(feedback => {
                return {
                    feedback_id: feedback._id,
                    comment: feedback.comment,
                    rating: feedback.rating
                };
            });
            res.status(200).send(updated_feedbacks);
        }
        else {
            res.status(404).json({ error: "No feedbacks found for the product" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getPoductFeedbacks = getPoductFeedbacks;
