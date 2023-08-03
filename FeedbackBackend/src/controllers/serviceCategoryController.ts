import { Request, Response } from 'express';
import FeedbackTemplate, { AnswerFormat, FeedbackFormat, FeedbackTemplateInterface, QuestionAnswerFormField } from '../db/models/template';
import { validateFormSchema } from '../validations/template';
import { TemplateType } from '../constants/constants';
import { Types } from 'mongoose';
import { buildErrorResponse, buildObjectResponse, buildResponse } from '../utils/responseUtils';
import { BusinessAdmin } from '../db/models/businessAdmin';
import FeedbackCategory from '../db/models/feedbackCategory';
import { generateUrlWithToken } from '../utils';
import { LinkBodyDto } from '../types/feedback';
import { validateLinkBodySchema } from '../validations/response';
import * as yup from 'yup';


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

