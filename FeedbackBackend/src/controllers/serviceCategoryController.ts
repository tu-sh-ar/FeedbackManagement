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
            delete category.businessCategoryId;
            return category;
        });

        return buildObjectResponse(res, modifiedCategories)
    } catch (error) {
        console.log(error)
        return buildErrorResponse(res, 'Internal server error', 500);
    }
}


export const getActiveLinkForTemplate = async (req: Request, res: Response) => {
    try {
        const serviceId = req.params.serviceId;
        const businessAdminId = req.params.businessAdminId;

        const bodyData = req.body as LinkBodyDto;

        await validateLinkBodySchema(bodyData);

        const existingTemplate: any = await BusinessAdmin.findOne(
            {
                'templates.active': true,
                businessAdminId,
                templateServiceCategoryId: new Types.ObjectId(serviceId),
            },
            { _id: 0, 'templates.$': 1 }
        )

        if (!existingTemplate) {
            return buildErrorResponse(res, 'Template is not active', 404);
        }

        const templateObj = existingTemplate.templates[0]?.id;

        const link = generateUrlWithToken(templateObj, bodyData);

        return buildObjectResponse(res, link)

    } catch (error) {
        console.log(error)
        if (error instanceof yup.ValidationError && error?.errors) {
            const errorMessage: string = error.errors?.join(', ') || 'Validation Error';
            return buildErrorResponse(res, errorMessage, 400);
        } else {
            return buildErrorResponse(res, 'Internal server error', 500);
        }
    }
}