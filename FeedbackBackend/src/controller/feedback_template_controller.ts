import { Request, Response } from 'express';
import FeedbackTemplate, { AnswerFormat, FeedbackFormat, IFeedbackTemplate, QuestionAnswerFormField } from "../model/feedback_template_model";
import asyncHandler from 'express-async-handler'
import { status_codes } from '../constants/constants';
import { validateFormSchema } from '../middlewares/validations/dynamic-feedback-form-validation';
import { TemplateType } from '../middlewares/enums/answerFormat_enum';
import * as yup from 'yup';
import { FeedbackFormBodySchema } from '../constants/interface';
import FeedbackDefaultTemplate from '../model/feedback_template_model_default';
import mongoose, { Types } from 'mongoose';
import { buildErrorResponse, buildObjectResponse, buildResponse } from '../utils/responseUtils';
import { TemplateSectionRequest, QuestionRequest } from '../middlewares/validations/request-body-validations';
import { ObjectId } from 'mongodb';


//fetches default templates bases on business category
export const getDefaultBusinessCategoryTemplates = async (req: Request, res: Response) => {
    try {
        const { businessCategoryId } = req.params;

        if (!Number.isInteger(parseInt(businessCategoryId, 10))) {
            return buildErrorResponse(res, 'Invalid businessCategoryId', 400);
        }

        const templatesByCategory: any = [];

        const aggregateResult: any[] = await FeedbackDefaultTemplate.aggregate([
            {
                $lookup: {
                    from: 'feedbackcategory',
                    localField: 'feedbackType',
                    foreignField: '_id',
                    as: 'feedbackType',
                },
            },
            {
                $unwind: '$feedbackType',
            },
            {
                $match: {
                    businessCategory: parseInt(businessCategoryId, 10),
                },
            },
            {
                $group: {
                    _id: '$feedbackType.name',
                    templates: {
                        $push: {
                            id: '$_id',
                            templateName: '$templateName',
                            businessCategory: '$businessCategory',
                            sections: '$sections',
                            isActive: '$isActive',
                        },
                    },
                    feedbackType: {
                        $first: {
                            id: '$feedbackType._id',
                            name: '$feedbackType.name'
                        },
                    },
                },
            },
        ]);

        aggregateResult.forEach((result: any) => {
            templatesByCategory.push({
                templates: result.templates,
                feedbackType: result.feedbackType
            })
        });

        return buildObjectResponse(res, templatesByCategory)

    } catch (error) {
        console.log(error);
        return buildErrorResponse(res, 'Internal Server Error', 500);
    }
}


//fetches default templates bases on business category
export const getBusinessAdminTemplates = async (req: Request, res: Response) => {
    try {
        const businessAdminId: number = req.user?.id;

        const { businessCategory } = req.params;

        if (!Number.isInteger(parseInt(businessCategory, 10))) {
            return buildErrorResponse(res, 'Invalid businessCategoryId', 400);
        }

        const templatesByCategory: any = [];

        const aggregateResult: any[] = await FeedbackTemplate.aggregate([
            {
                $match: {
                    $or: [
                        { businessAdminId: businessAdminId },
                        { templateType: TemplateType.DEFAULT, feedbackType: { $exists: true } }
                    ],
                    businessCategory: parseInt(businessCategory, 10)
                }
            },
            {
                $lookup: {
                    from: 'feedbackcategory',
                    localField: 'feedbackType',
                    foreignField: '_id',
                    as: 'feedbackType',
                },
            },
            {
                $unwind: '$feedbackType',
            },
            {
                $group: {
                    _id: {
                        feedbackTypeName: '$feedbackType.name',
                        isDefaultTemplate: { $eq: ['$templateType', TemplateType.DEFAULT] }
                    },
                    templates: {
                        $push: {
                            id: '$_id',
                            templateType: '$templateType',
                            templateName: '$templateName',
                            isActive: '$isActive',
                        },
                    },
                    feedbackType: {
                        $first: {
                            id: '$feedbackType._id',
                            name: '$feedbackType.name'
                        },
                    },
                },
            },
            {
                $sort: { '_id.isDefaultTemplate': -1 },
            },
            {
                $group: {
                    _id: '$_id.feedbackTypeName',
                    templates: {
                        $push: '$templates',
                    },
                    feedbackType: {
                        $first: '$feedbackType'
                    }
                },
            },
        ]);

        aggregateResult.forEach((result: any) => {
            templatesByCategory.push({
                templates: result.templates.flat(),
                feedbackType: result.feedbackType
            })
        });

        return buildObjectResponse(res, templatesByCategory)

    } catch (error) {
        console.log(error);
        return buildErrorResponse(res, 'Internal Server Error', 500);
    }
}


// Fetches a single template based on templateId with sorted questions and sections
export const getTemplateById = async (req: Request, res: Response) => {
    try {
        const { templateId } = req.params;

        const template: IFeedbackTemplate | null = await FeedbackTemplate.findById(templateId);

        if (!template) {
            return buildErrorResponse(res, 'Template not found', 404);
        }

        template.sections.sort((a, b) => a.order - b.order);
        template.sections.forEach((section) => {
            section.questions.sort((a, b) => a.order - b.order);
        });

        const { _id, ...templateData } = template.toObject();

        return buildObjectResponse(res, { id: _id, ...templateData })
    } catch (error) {
        console.log(error);
        return buildErrorResponse(res, 'Internal Server Error', 500);
    }
}


export const getTemplateByFeebbackCategoryId = async (req: Request, res: Response) => {
    try {
        const businessAdminId: number = req.user?.id;

        const { feedbackTypeId } = req.params;

        if (!Number.isInteger(parseInt(feedbackTypeId, 10))) {
            return buildErrorResponse(res, 'Invalid feedbackTypeId', 400);
        }

        const filter: any = {
            $or: [
                { businessAdminId: businessAdminId },
                { businessAdminId: { $exists: false } },
            ],
            feedbackType: new Types.ObjectId(feedbackTypeId),
        };

        const templates: IFeedbackTemplate[] = await FeedbackTemplate.find(
            filter, { _id: 1, templateName: 1, templateType: 1 })
            .sort({ templateType: -1 });
            
        return buildObjectResponse(res, templates)

    } catch (error) {
        console.log(error);
        return buildErrorResponse(res, 'Internal Server Error', 500);
    }
}


export const swapSections = async (req: Request, res: Response) => {
    try {
        const { templateId } = req.params;

        const sections = req.body as TemplateSectionRequest[];

        //const parsedTemplateId = parseInt(templateId);

        // if (isNaN(templateId)) {
        //     return buildErrorResponse(res, 'Invalid templateId format', 400);
        // }

        const template = await FeedbackTemplate.findById(templateId);

        if (!template) {
            return buildErrorResponse(res, 'Template not found', 404);
        }

        const missingSectionIds: number[] = [];
        sections.forEach((section) => {
            if (!template.sections.some((sectionData) => sectionData.id === section.sectionId)) {
                missingSectionIds.push(section.sectionId);
            }
        });

        if (missingSectionIds.length > 0) {
            return buildErrorResponse(res, `Sections not found: ${missingSectionIds.join(', ')}`, 404);
        }

        sections.forEach((section) => {
            const targetSection = template.sections.find((sectionData) => sectionData.id === section.sectionId);
            if (targetSection) {
                targetSection.order = section.newOrder;
            }
        });

        await template.save();

        return buildResponse(res, 'Section order updated successfully', 200)
    } catch (error) {
        console.log(error);
        return buildErrorResponse(res, 'Internal Server Error', 500);
    }
}


export const swapQuestions = async (req: Request, res: Response) => {
    try {
        const { templateId } = req.params;
        const { questions, sectionId } = req.body as { questions: QuestionRequest[], sectionId:string};
        
       // const parsedTemplateId = parseInt(templateId);
        const parsedSectionId = parseInt(sectionId);

        const template = await FeedbackTemplate.findById(templateId);
        
        if (!template) {
            return buildErrorResponse(res, 'Template not found', 404);
        }

        const section = template.sections.find((sec) => sec.id === parsedSectionId);

        if (!section) {
            return buildErrorResponse(res, 'Section not found', 404);
        }

        for (const question of questions) {
            const { questionId, newOrder } = question;
            const targetQuestion = section.questions.find((ques) => ques.id === questionId);
            if (targetQuestion) {
                targetQuestion.order = newOrder;
            }
        }

        await template.save();

        return buildResponse(res, 'Question order swapped successfully', 200);

    } catch (error) {
        console.log(error);
        return buildErrorResponse(res, 'Internal Server Error Occured', 500);
    }
}


const validateAndTransformForm = async (
    roleId: number,
    businessAdminId: number,
    formData: FeedbackFormBodySchema,) => {
    try {
        await validateFormSchema(formData)

        const convertToAnswerFormat = (answerFormat: any): AnswerFormat => {
            const convertedFormat: AnswerFormat = {
                type: answerFormat.type,
                required: answerFormat.required,
            };
            if (answerFormat.options) {
                convertedFormat.options = answerFormat.options;
            }
            if (answerFormat.upperBound) {
                convertedFormat.upperBound = answerFormat.upperBound;
            }
            return convertedFormat;
        };

        const convertToQuestionAnswerFormField = (sections: any[]): QuestionAnswerFormField[] => {
            return sections.map((section, index) => {
                const convertedField: QuestionAnswerFormField = {
                    id: index + 1,
                    question: section.question,
                    order: section.order,
                    answerFormat: convertToAnswerFormat(section.answerFormat),
                };
                return convertedField;
            });
        };

        const convertToFeedbackFormat = (sections: any[]): FeedbackFormat[] => {
            return sections.map((section, index) => {
                const convertedFormat: FeedbackFormat = {
                    id: index + 1,
                    title: section.title,
                    order: section.order,
                    questions: convertToQuestionAnswerFormField(section.questions),
                };
                return convertedFormat;
            });
        };
        const convertToFeedbackTemplate = (feedbackForm: FeedbackFormBodySchema) => {
            let feedbackTemplate: any = {
                businessCategory: feedbackForm.businessCategory,
                templateName: feedbackForm.feedbackFormName,
                feedbackType: new Types.ObjectId(feedbackForm.feedbackType),
                sections: convertToFeedbackFormat(feedbackForm.sections),
                isActive: false,
            };

            if (roleId === 2 && businessAdminId) {
                feedbackTemplate = {
                    ...feedbackTemplate,
                    used: false,
                    templateType: TemplateType.CUSTOM,
                    businessAdminId: businessAdminId
                }
            } else if (roleId === 1) {
                feedbackTemplate = {
                    ...feedbackTemplate,
                    templateType: TemplateType.DEFAULT,
                }
            }
            return feedbackTemplate;
        };

        const feedbackForm = convertToFeedbackTemplate(formData)
        return feedbackForm;
    } catch (error) {
        throw error;
    }
}


// create new feedback template 
export const createTemplate = async (req: Request, res: Response) => {
    try {

        const businessAdminId: number = req.user?.id;
        const roleId: number = req.user?.role;

        const formData: FeedbackFormBodySchema = req.body;

        const data = await validateAndTransformForm(roleId, businessAdminId, formData);

        console.log(JSON.stringify(data, null, 2))

        await FeedbackTemplate.create(data);

        return buildResponse(res, "Feedback form created successfully", 200)

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
};


// update template 
export const updateTemplate = asyncHandler(async (req: Request, res: Response) => {

    try {
        const { templateId } = req.params;
        const templateData: FeedbackFormBodySchema = req.body;
        const businessAdminId: number = req.user?.id;
        const roleId: number = req.user?.role;

        // Validate and transform the templateId parameter
        const parsedTemplateId = parseInt(templateId);

        // Check if the transformation was successful
        if (isNaN(parsedTemplateId)) {
            res.status(400).json({ error: 'Invalid templateId format' });
        }

        const existingTemplate = await FeedbackTemplate.findById(parsedTemplateId);

        // Check if the template exists
        if (!existingTemplate) {
            res.status(404).json({ error: 'Template not found' });
        }

        // Check if the template is active
        if (existingTemplate && existingTemplate.used) {
            res.status(400).json({ error: 'Cannot update an in use or used template' });
        }

        const data = await validateAndTransformForm(roleId, businessAdminId, templateData);

        console.log(JSON.stringify(data, null, 2))

        await FeedbackTemplate.findByIdAndUpdate(parsedTemplateId, templateData, { new: true });
        res.status(200).json({ message: 'Feedback form updated successfully' });

    } catch (error) {
        console.log(error)
        if (error instanceof yup.ValidationError && error?.errors) {
            // If there's a validation error, send the error response
            const errorMessage: string = error.errors?.join(', ') || 'Validation Error';
            res.status(400).json({ error: errorMessage });
        } else {
            res.status(500).json({ error: status_codes[500] });
        }
    }
})


// activating template
export const activateTemplate = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { businessAdminId } = req.params;
        const { feedbackType, templateId } = req.body;

        const parsedBusinessAdminId = parseInt(businessAdminId);
        const parsedFeedbackType = feedbackType;
        const parsedTemplateId = templateId;

        if (isNaN(parsedFeedbackType)) {
            res.status(400).json({ error: 'Invalid feedbackType format' });
        }

        if (isNaN(parsedBusinessAdminId)) {
            res.status(400).json({ error: 'Invalid businessAdminId format' });
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            await FeedbackTemplate.updateMany(
                {
                    businessAdminId: parsedBusinessAdminId,
                    feedbackType: feedbackType,
                    isActive: true
                },
                { isActive: false },
                { session }
            );

            await FeedbackTemplate.findByIdAndUpdate(
                parsedTemplateId,
                { isActive: true, used: true },
                { session }
            );

            await session.commitTransaction();
            session.endSession();

            res.json({ message: 'Template activated successfully' });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }

    } catch (error) {
        res.status(500).json({ error: status_codes[500] });
    }
})


// delete a template 
export const deleteTemplate = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { templateId } = req.params;

        const parsedTemplateId = templateId;

        const existingTemplate = await FeedbackTemplate.findById(parsedTemplateId);

        if (!existingTemplate) {
            res.status(404).json({ error: 'Template not found' });
        }

        // Check if the template is active or in use
        if (existingTemplate && existingTemplate.used) {
            res.status(400).json({ error: 'Cannot delete a template in use' });
        }

        // Delete the template
        await FeedbackTemplate.findByIdAndDelete(parsedTemplateId);

        res.json({ message: 'Template deleted successfully' });
    } catch (error) {
        console.error('Error deleting template:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
