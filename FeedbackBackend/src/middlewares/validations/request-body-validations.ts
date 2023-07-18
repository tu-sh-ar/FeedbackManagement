import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { buildErrorResponse } from '../../utils/responseUtils';
import { areContiguousIntegersStartingFromOne } from '../../utils';

interface TemplateSectionRequest {
    sectionId: number;
    newOrder: number;
}


interface QuestionRequest {
    questionId: number;
    newOrder: number;
}

const questionRequestSchema = yup.object().shape({
    questionId: yup.number().integer().required(),
    newOrder: yup.number().integer().required(),
});

const sectionsSchema = yup.array().of(
    yup.object().shape({
        sectionId: yup.number().integer().required(),
        newOrder: yup.number().integer().required(),
    })
).test('isContiguous', 'newOrder values must be contiguous integers starting from 1',
    function (sections) {
        const newOrders = sections ? sections.map((section: TemplateSectionRequest) => section.newOrder) : [];
        return areContiguousIntegersStartingFromOne(newOrders);
    });


    
async function validateSectionsMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await sectionsSchema.validate(req.body);
        next();
    } catch (error) {
        if (error instanceof yup.ValidationError && error?.errors) {
            const errorMessage: string = error.errors?.join(', ') || 'Validation Error';
            buildErrorResponse(res, errorMessage, 400);
        } else {
            buildErrorResponse(res, 'Interval server error', 500);
        }
    }
}


const validateSwapQuestionsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { sectionId, questions } = req.body;

        const parsedSectionId = parseInt(sectionId);
        if (isNaN(parsedSectionId)) {
            buildErrorResponse(res, 'Invalid sectionId format', 400);
        }

        if (!Array.isArray(questions) || questions.length === 0) {
            buildErrorResponse(res, 'Questions must be a non-empty array', 500);
        }

        const newOrders: number[] = [];

        for (const question of questions) {
            await questionRequestSchema.validate(question);
            newOrders.push(question.newOrder);
        }

        if (!areContiguousIntegersStartingFromOne(newOrders)) {
            buildErrorResponse(res, 'newOrder values must be contiguous integers starting from 1', 500);
        }

        next();
    } catch (error) {
        if (error instanceof yup.ValidationError && error?.errors) {
            const errorMessage: string = error.errors?.join(', ') || 'Validation Error';
            buildErrorResponse(res, errorMessage, 400);
        } else {
            buildErrorResponse(res, 'Interval server error', 500);
        }
    }
};

export { TemplateSectionRequest, validateSectionsMiddleware, validateSwapQuestionsMiddleware };