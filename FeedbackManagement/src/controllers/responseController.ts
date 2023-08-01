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


//create response
export const createResponse = async (req: Request, res: Response) => {
    try {
        const businessAdminId: number = req.user?.id;
        const { templateId } = req.params;
        const formData = req.body as TemplateResponseDTO;
        console.log(formData)
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

        // Fetch the response by its ID
        const response = await FeedbackTemplateResponse.findById(responseId).populate('template')

        if (!response) {
            return buildErrorResponse(res, 'Response not found', 404);
        }

        return buildObjectResponse(res, response)
    } catch (error) {
        console.error('Error fetching response:', error);
        return buildErrorResponse(res, 'Internal Server Error', 500);
    }
};


export const getResponseBasedOnEntity = async (req: Request, res: Response) => {
    try {
        const { templateId } = req.params;

        const matchCriteria = templateId ? { template: new Types.ObjectId(templateId) } : {};

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
                },
            },
            {
                $project: {
                    _id: 0,
                },
            },
        ]);

        return buildObjectResponse(res, responseGroups)
    } catch (error) {
        console.error('Error fetching response:', error);
        return buildErrorResponse(res, 'Internal Server Error', 500);
    }
};


export const getResponseOfEntity = async (req: Request, res: Response) => {
    try {
        const { entityId, templateId } = req.params;

        // Fetch the response by its ID
        const response = await FeedbackTemplateResponse.find(
            { entityId, template: templateId }, { sections: 0, template: 0, entityId: 0 })

        if (!response) {
            return buildErrorResponse(res, 'Response not found', 404);
        }

        return buildObjectResponse(res, response)
    } catch (error) {
        console.error('Error fetching response:', error);
        return buildErrorResponse(res, 'Internal Server Error', 500);
    }
};


export const uploadImages = async (req: Request, res: Response) => {
    try {
        if(!req.file){
            return  buildErrorResponse(res, 'File is not uploaded', 500);
        }
        const serverURL = 'http://127.0.0.1:3000';

        const fileURL = `${serverURL}/uploads/${req.file.filename}`;
        return buildObjectResponse(res, { url: fileURL })

    } catch (error) {
        console.error('Error fetching response:', error);
        return buildErrorResponse(res, 'Internal Server Error', 500);
    }
}