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
exports.getServiceCategories = void 0;
const responseUtils_1 = require("../utils/responseUtils");
const feedbackCategory_1 = __importDefault(require("../db/models/feedbackCategory"));
//create response
const getServiceCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const businessAdminId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const businessCategoryId = req.params.businessCategoryId;
        const categories = yield feedbackCategory_1.default.find({
            $or: [
                { businessCategoryId, creationType: 2 },
                { businessAdminId, creationType: 1 }
            ]
        }).lean();
        const modifiedCategories = categories.map(category => {
            category.id = category._id;
            delete category._id;
            return category;
        });
        return (0, responseUtils_1.buildObjectResponse)(res, modifiedCategories);
    }
    catch (error) {
        console.log(error);
        return (0, responseUtils_1.buildErrorResponse)(res, 'Internal server error', 500);
    }
});
exports.getServiceCategories = getServiceCategories;
