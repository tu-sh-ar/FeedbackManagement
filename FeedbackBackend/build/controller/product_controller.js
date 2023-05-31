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
exports.createProduct = exports.getProduct = void 0;
const product_model_1 = __importDefault(require("../model/product_model"));
const feedback_model_1 = __importDefault(require("../model/feedback_model"));
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product_id = req.params.id;
    let average_rating;
    try {
        const feedback_data = yield feedback_model_1.default.find({ product_id: product_id });
        const ratings = feedback_data.map((feedback) => feedback.rating);
        const sum = ratings.reduce((acc, rating) => acc + rating, 0);
        average_rating = sum / ratings.length;
        const product_data = yield product_model_1.default.findById(product_id);
        if (!product_data) {
            res.status(404).json({ error: "No product found" });
            return;
        }
        const updated_data = Object.assign(Object.assign({}, product_data.toObject()), { avg_rating: average_rating });
        res.status(200).send(updated_data);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getProduct = getProduct;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product_data = req.body;
    yield product_model_1.default.create(product_data)
        .then(data => res.status(201).send(data))
        .catch(err => res.status(400).send(err));
});
exports.createProduct = createProduct;
