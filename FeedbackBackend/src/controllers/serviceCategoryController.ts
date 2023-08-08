import { Request, Response } from 'express';
import FeedbackTemplate, { AnswerFormat, FeedbackFormat, FeedbackTemplateInterface, QuestionAnswerFormField } from '../db/models/template';
import { buildErrorResponse, buildObjectResponse, buildResponse } from '../utils/responseUtils';
import FeedbackCategory from '../db/models/feedbackCategory';



//create response
export const getServiceCategories = async (req: Request, res: Response) => {
    try {

        const businessAdminId: number = req.user?.id;
        const businessCategoryId = req.params.businessCategoryId;

        const categories = await FeedbackCategory.find({
            $or: [
                { businessCategoryId, creationType: 2 },
                { businessAdminId, creationType: 1 }
            ]
        }).lean()

        const modifiedCategories = categories.map(category => {
            category.id = category._id;
            delete category._id;
            return category;
        });

        return buildObjectResponse(res, modifiedCategories)
    } catch (error) {
        console.log(error)
        return buildErrorResponse(res, 'Internal server error', 500);
    }
}

