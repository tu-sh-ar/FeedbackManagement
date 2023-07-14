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
exports.createDeliveryAgentFeedbacks = exports.getDeliveryAgentFeedbacks = exports.getAllFeedbacks = exports.getFeedbacksByDate = exports.getPoductFeedbacks = exports.get_feedback = exports.deleteFeedback = exports.updateFeedback = exports.createFeedback = exports.getFeedbacks = void 0;
const feedback_model_1 = __importDefault(require("../model/feedback_model"));
const delivery_agent_model_1 = __importDefault(require("../model/delivery_agent_model"));
const user_model_1 = __importDefault(require("../model/user_model"));
const constants_1 = require("../constants/constants");
// create a feedback
const getFeedbacks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    if (page < 1 || size > 25 || size < 1) {
        res.status(400).json({ error: constants_1.status_codes[400] });
    }
    try {
        const totalCount = yield feedback_model_1.default.countDocuments();
        const totalPages = Math.ceil(totalCount / size);
        const skip = (page - 1) * size;
        const feedbacks = yield feedback_model_1.default.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(size);
        const updated_feedback = yield Promise.all(feedbacks.map((feedback) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ _id: feedback.user_id });
            return {
                feedback_id: feedback._id,
                user_id: feedback.user_id,
                user_name: user ? user.name : null,
                product_id: feedback.product_id,
                rating: feedback.rating,
                comment: feedback.comment,
                review: feedback.additional_fields,
                QA: feedback.qas,
                created_at: feedback.createdAt,
                updated_at: feedback.updatedAt,
            };
        })));
        const response = {
            feedbacks: updated_feedback,
            currentPage: page,
            totalPages: totalPages,
            totalFeedbacks: totalCount,
        };
        res.status(200).send(response);
    }
    catch (error) {
        res.status(404).json({ error: constants_1.status_codes[404] });
    }
});
exports.getFeedbacks = getFeedbacks;
// create a feedback
const createFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const feedback_data = req.body;
    const template_type = (_a = req.body) === null || _a === void 0 ? void 0 : _a.template_type;
    // gettting user credentials 
    // const user_id = req.user?.id;
    try {
        // getting the user_id from the auth 
        // const user_id = req.user?.id;  // auth token payload 
        // const delivery_agent_data = DeliveryAgent.findOne({user_id:user_id})
        // feedback_data.deliveryagent_id = delivery_agent_data._id;
        //searhing for an existing template for the given template type
        // const feedback_template = await FeedbackTemplate.findOne({type:template_type});
        // check if the user exists and then make the response 
        const new_feedback_data = Object.assign({}, feedback_data);
        yield feedback_model_1.default.create(new_feedback_data)
            .then(data => res.status(201).send(data))
            .catch(err => res.status(400).json({ error: constants_1.status_codes[400] }));
    }
    catch (error) {
        res.status(500).json({ error: constants_1.status_codes[500] });
    }
});
exports.createFeedback = createFeedback;
// create a feedback
const updateFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const feedback_data = req.body;
    const id = req.params.id;
    try {
        feedback_model_1.default.findByIdAndUpdate(id, feedback_data)
            .then(data => res.status(200).send(constants_1.status_codes[200]))
            .catch(err => res.status(404).send(err));
    }
    catch (error) {
        res.status(500).json({ error: constants_1.status_codes[500] });
    }
});
exports.updateFeedback = updateFeedback;
// delete a feedback
const deleteFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const feedback_id = req.params.id;
    try {
        feedback_model_1.default.findByIdAndDelete(feedback_id)
            .then(data => res.status(200).send(constants_1.status_codes[200]))
            .catch(err => res.status(404).json({ error: constants_1.status_codes[404] }));
    }
    catch (error) {
        res.status(500).json({ error: constants_1.status_codes[500] });
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
            res.status(404).json({ error: constants_1.status_codes[404] });
        }
    }
    catch (error) {
        res.status(500).json({ error: constants_1.status_codes[500] });
    }
});
exports.get_feedback = get_feedback;
// get feedbacks based on product id
const getPoductFeedbacks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product_id = req.params.product_id;
    const range = req.query.range;
    const month_range = parseInt(range);
    const current_date = new Date();
    current_date.setMonth(current_date.getMonth() - month_range);
    if (!range || month_range < 1) {
        res.status(400).json({ error: constants_1.status_codes[400] });
        return;
    }
    try {
        const feedbacks = yield feedback_model_1.default.find({
            product_id: product_id,
            createdAt: { $gte: current_date },
        });
        if (feedbacks.length) {
            const updated_feedbacks = feedbacks.map(feedback => {
                return {
                    feedback_id: feedback._id,
                    comment: feedback.comment,
                    rating: feedback.rating
                };
            });
            // find average ratings 
            const ratings = feedbacks.map((feedback) => feedback.rating);
            const sum = ratings.reduce((acc, rating) => acc + rating, 0);
            const average_rating = sum / ratings.length;
            res.status(200).json({
                product_id: product_id,
                AvgRating: average_rating,
                feedbacks: updated_feedbacks
            });
        }
        else {
            res.status(404).json({ error: constants_1.status_codes[404] });
        }
    }
    catch (error) {
        res.status(500).json({ error: constants_1.status_codes[500] });
    }
});
exports.getPoductFeedbacks = getPoductFeedbacks;
// filter api according to date 
const getFeedbacksByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = {
        start: req.query.start,
        end: req.query.end
    };
    let updated_feedback = [];
    try {
        const feedbacks = yield feedback_model_1.default.find({
            createdAt: {
                $gte: new Date(date.start),
                $lte: new Date(date.end)
            }
        });
        feedbacks.forEach((feedback) => __awaiter(void 0, void 0, void 0, function* () {
            const user_data = yield user_model_1.default.findById(feedback.user_id);
            const new_feedback = {
                feedback_id: feedback._id,
                user_id: feedback.user_id,
                user_name: user_data === null || user_data === void 0 ? void 0 : user_data.name,
                product_id: feedback === null || feedback === void 0 ? void 0 : feedback.product_id,
                rating: feedback.rating,
                comment: feedback === null || feedback === void 0 ? void 0 : feedback.comment,
                review: feedback === null || feedback === void 0 ? void 0 : feedback.additional_fields,
                QA: feedback === null || feedback === void 0 ? void 0 : feedback.qas,
                created_at: feedback.createdAt,
                updated_at: feedback.updatedAt
            };
            updated_feedback.push(new_feedback);
        }));
        res.send(updated_feedback);
    }
    catch (error) {
        res.status(500).json({ error: constants_1.status_codes[500] });
    }
});
exports.getFeedbacksByDate = getFeedbacksByDate;
//testing purpose 
const getAllFeedbacks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const feedbacks = yield feedback_model_1.default.find().sort({ createdAt: -1 });
        const updated_feedback = [];
        for (const feedback of feedbacks) {
            const user_data = yield user_model_1.default.findById(feedback.user_id);
            const new_feedback = {
                feedback_id: feedback._id,
                user_id: feedback.user_id,
                user_name: user_data === null || user_data === void 0 ? void 0 : user_data.name,
                product_id: feedback === null || feedback === void 0 ? void 0 : feedback.product_id,
                // product_name
                rating: feedback.rating,
                comment: feedback === null || feedback === void 0 ? void 0 : feedback.comment,
                review: feedback === null || feedback === void 0 ? void 0 : feedback.additional_fields,
                QA: feedback === null || feedback === void 0 ? void 0 : feedback.qas,
                created_at: feedback.createdAt,
                updated_at: feedback.updatedAt,
            };
            updated_feedback.push(new_feedback);
        }
        res.status(200).send(updated_feedback);
    }
    catch (error) {
        res.status(500).json({ error: constants_1.status_codes[500] });
    }
});
exports.getAllFeedbacks = getAllFeedbacks;
// delivery agent feedback apis 
const getDeliveryAgentFeedbacks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const agent_id = parseInt(req.params.agent_id);
    try {
        const feedback = yield delivery_agent_model_1.default.findOne({ deliveryagent_id: agent_id });
        const updated_feedback = {
            agent_id: agent_id,
            rating: feedback === null || feedback === void 0 ? void 0 : feedback.rating,
            comment: feedback === null || feedback === void 0 ? void 0 : feedback.comment,
        };
        res.status(200).send(updated_feedback);
    }
    catch (error) {
        res.status(404).json({ error: constants_1.status_codes[404] });
    }
});
exports.getDeliveryAgentFeedbacks = getDeliveryAgentFeedbacks;
const createDeliveryAgentFeedbacks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const feedback = yield delivery_agent_model_1.default.create(data);
        res.status(200).send(feedback);
    }
    catch (error) {
        res.status(500).json({ error: constants_1.status_codes[500] });
    }
});
exports.createDeliveryAgentFeedbacks = createDeliveryAgentFeedbacks;
