import { Request, Response } from 'express';
import FeedbackTemplate, { AnswerFormat, FeedbackFormat, FeedbackTemplateInterface, QuestionAnswerFormField } from '../db/models/template';
import { validateFormSchema } from '../validations/template';
import { TemplateType } from '../constants/constants';
import * as yup from 'yup';
import { TemplateResponseDTO } from '../types/feedback';
import { Types } from 'mongoose';
import { buildErrorResponse, buildObjectResponse, buildResponse } from '../utils/responseUtils';
import { validateResponseSchema } from '../validations/response';
import FeedbackTemplateResponse from '../db/models/feedbackResponse';
import { BusinessAdmin } from '../db/models/businessAdmin';
import { mapQuestionResponses } from '../utils';
import FeedbackCategory from '../db/models/feedbackCategory';


//create response
export const createResponse = async (req: Request, res: Response) => {
    try {
        const businessAdminId: number = req.user?.id;
        const { templateId } = req.params;
        const formData = req.body as TemplateResponseDTO;
        await validateResponseSchema(formData)

        await FeedbackTemplateResponse.create({ template: new Types.ObjectId(templateId), ...formData });

        console.log(formData, businessAdminId, templateId)
        console.log(JSON.stringify(formData, null, 2))

        return buildResponse(res, "Template feedback response added successfully", 200)
    } catch (error) {
        console.log(error)
        if (error instanceof yup.ValidationError && error?.errors) {
            // If there's a validation error, send the error response
            const errorMessage: string = error.errors?.join(', ') || 'Validation Error';
            return buildErrorResponse(res, errorMessage, 400);
        } else {
            return buildErrorResponse(res, 'Internal server error', 500);
        }
    }
}


export const getResponseWithQuestions = async (req: Request, res: Response) => {
    try {
        const { responseId } = req.params;

        if (!Types.ObjectId.isValid(responseId)) {
            return buildErrorResponse(res, 'responseId format is not valid', 404);
        }

        // Fetch the response by its ID
        const response = await FeedbackTemplateResponse.findById(responseId).populate('template')


        if (!response) {
            return buildErrorResponse(res, 'Response not found', 404);
        }
        const templateResponse = mapQuestionResponses(response.template.sections,
            response.sectionResponse);

        return buildObjectResponse(res, {
            templateName: response.template.templateName,
            authorId: response.authorId,
            authorName: response.authorName,
            entityName: response.entityName,
            entityId: response.entityId,
            templateResponse,
        })
    } catch (error) {
        console.error('Error fetching response:', error);
        return buildErrorResponse(res, 'Internal Server Error', 500);
    }
};


export const getResponseBasedOnEntityId = async (req: Request, res: Response) => {
    try {
        const { serviceId } = req.params;
        const businessAdminId: number = req.user?.id;

        if (!Types.ObjectId.isValid(serviceId)) {
            return buildErrorResponse(res, 'serviceId format is not valid', 404);
        }

        const category = await FeedbackCategory.findById(new Types.ObjectId(serviceId))

        if (!category) {
            return buildErrorResponse(res, 'Service not found.', 404);
        }

        const businessAdminTemplate = await BusinessAdmin.findOne(
            {
                businessAdminId, templateServiceCategoryId: new Types.ObjectId(serviceId),
                'templates.active': true
            },
        )

        if (!businessAdminTemplate) {
            return buildResponse(res, 'Template is not active', 200)
        }

        const templates = businessAdminTemplate?.templates.map((item) => item.id);

        const matchCriteria = { template: { $in: templates } };

        const responseGroups = await FeedbackTemplateResponse.aggregate([
            {
                $match: matchCriteria,
            },
            {
                $sort: { createdAt: -1 },
            },
            {
                $group: {
                    _id: '$entityId',
                    entityId: { $first: '$entityId' },
                    entityName: { $first: '$entityName' },
                    count: { $sum: 1 },
                    createdAt: { $first: '$createdAt' }
                },
            },
            {
                $sort: { createdAt: -1 },
            },
            {
                $project: {
                    _id: 0,
                    createdAt: 0
                },
            },
        ]);

        return buildObjectResponse(res, { responseGroups })
    } catch (error) {
        console.error('Error fetching response:', error);
        return buildErrorResponse(res, 'Internal Server Error', 500);
    }
};


export const getResponsesOfEntity = async (req: Request, res: Response) => {
    try {
        const { entityId } = req.params;
        const { pageNumber, pageSize } = req.query;

        if (!pageNumber || !pageSize || isNaN(Number(pageNumber)) || isNaN(Number(pageSize))) {
            return buildErrorResponse(res, 'Invalid pagination parameters', 404);
        }

        const pageNumberVal = Number(pageNumber);
        const pageSizeNumberVal = Number(pageSize);
        if (pageNumberVal < 0 || pageSizeNumberVal < 0) {
            return buildErrorResponse(res, 'Invalid page or pageSize', 404);
        }

        const totalResponses = await FeedbackTemplateResponse.find(
            { entityId, }, {
            sectionResponse: 0,
            template: 0, entityId: 0, updatedAt: 0
        }).count()

        // Fetch the responses
        const response = await FeedbackTemplateResponse.find(
            { entityId, }, {
            sectionResponse: 0,
            template: 0, entityId: 0, updatedAt: 0
        }).sort({ createdAt: -1 })
            .skip((pageNumberVal - 1) * pageSizeNumberVal)
            .limit(pageSizeNumberVal);

        if (!response) {
            return buildErrorResponse(res, 'Response not found', 404);
        }

        return buildObjectResponse(res, { data: response, totalResponses })
    } catch (error) {
        console.error('Error fetching response:', error);
        return buildErrorResponse(res, 'Internal Server Error', 500);
    }
};


export const uploadImages = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return buildErrorResponse(res, 'File is not uploaded', 400);
        }
        const serverURL = 'https://feedbackbackend-dev.azurewebsites.net';

        const fileURL = `${serverURL}/${req.file.filename}`;
        return buildObjectResponse(res, { url: fileURL })

    } catch (error) {
        console.error('Error fetching response:', error);
        return buildErrorResponse(res, 'Internal Server Error', 500);
    }
}