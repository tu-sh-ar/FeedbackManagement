// feedback template controller 
import { Request, Response } from 'express';
import FeedbackTemplate, { AnswerFormat, FeedbackFormat, IFeedbackTemplate, QuestionAnswerFormField } from "../model/feedback_template_model_custom";
import asyncHandler from 'express-async-handler'
import { status_codes } from '../constants/constants';
import { validateFormSchema } from '../middlewares/validations/dynamic-feedback-form-validation';
import { TemplateType } from '../middlewares/enums/answerFormat_enum';
import * as yup from 'yup';
import { FeedbackFormBodySchema } from '../constants/interface';
import FeedbackCategory, { IFeedbackCaregory } from '../model/feedback_category_model';
import FeedbackDefaultTemplate from '../model/feedback_template_model_default';
import { ObjectId } from 'mongodb';
import mongoose, { Types } from 'mongoose';


//fetches default templates bases on business category
export const getDefaultBusinessCategoryTemplates = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { businessCategoryId } = req.params;

        if (!Number.isInteger(parseInt(businessCategoryId, 10))) {
            res.status(400).json({ error: 'Invalid businessCategoryId' });
        }

        const templatesByCategory: Record<string, IFeedbackTemplate[]> = {};

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
                            feedbackType: {
                                id: '$feedbackType._id',
                                name: '$feedbackType.name'
                            }
                        },
                    },
                },
            },
        ]);

        aggregateResult.forEach((result: any) => {
            templatesByCategory[result._id] = result.templates;
        });

        res.status(200).json({ templatesByCategory });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


// Allot default templates to business admin on registration
export const allotDefaultTemplatesToBusinessAdmin = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { businessAdminId, businessCategoryId } = req.params;

        // Find the default templates based on the provided businessCategoryId
        const defaultTemplates = await FeedbackDefaultTemplate.find({ businessCategory: businessCategoryId });

        const templates = defaultTemplates.map((defaultTemplate) => ({
            templateName: defaultTemplate.templateName,
            templateType: TemplateType.DEFAULT,
            feedbackType: defaultTemplate.feedbackType,
            businessCategory: defaultTemplate.businessCategory,
            sections: defaultTemplate.sections,
            businessAdminId: parseInt(businessAdminId, 10),
            defaultTemplateId: defaultTemplate._id,
            used: 0,
            isActive: false,
        }));

        await FeedbackTemplate.insertMany(templates);

        res.status(200).json({ message: 'Templates alloted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


//fetches default templates bases on business category
export const getBusinessAdminTemplates = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { businessAdminId } = req.params;

        if (!Number.isInteger(parseInt(businessAdminId, 10))) {
            res.status(400).json({ error: 'Invalid businessAdminId' });
        }

        const templatesByCategory: Record<string, IFeedbackTemplate[]> = {};

        const aggregateResult: any[] = await FeedbackTemplate.aggregate([
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
                    businessAdminId: parseInt(businessAdminId, 10),
                },
            },
            {
                $group: {
                    _id: '$feedbackType.name',
                    templates: {
                        $push: {
                            id: '$_id',
                            templateName: '$templateName',
                            isActive: '$isActive',
                            feedbackType: {
                                id: '$feedbackType._id',
                                name: '$feedbackType.name'
                            }
                        },
                    },
                },
            },
        ]);

        aggregateResult.forEach((result: any) => {
            templatesByCategory[result._id] = result.templates;
        });

        res.status(200).json({ templatesByCategory });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


// Fetches a single template based on templateId with sorted questions and sections
export const getTemplateById = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { templateId } = req.params;

        const template: IFeedbackTemplate | null = await FeedbackTemplate.findById(templateId);

        if (!template) {
            res.status(404).json({ error: 'Template not found' });
            return;
        }

        // Sort sections and questions based on their order
        template.sections.sort((a, b) => a.order - b.order);
        template.sections.forEach((section) => {
            section.questions.sort((a, b) => a.order - b.order);
        });

        const { _id, ...templateData } = template.toObject();

        res.status(200).json({ id: _id, ...templateData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export const swapSections = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { templateId } = req.params;
        const { sectionId1, sectionId2 } = req.body;

        // Validate and transform the templateId parameter
        const parsedTemplateId = parseInt(templateId);

        // Check if the transformation was successful
        if (isNaN(parsedTemplateId)) {
            res.status(400).json({ error: 'Invalid templateId format' });
        }

        // Find the template by ID
        const template = await FeedbackTemplate.findById(parsedTemplateId);

        // Check if the template exists
        if (!template) {
            res.status(404).json({ error: 'Template not found' });
            return;
        }

        // Find the sections by their IDs
        const section1 = template.sections.find((section) => section.id === sectionId1);
        const section2 = template.sections.find((section) => section.id === sectionId2);

        // Check if the sections exist
        if (!section1 || !section2) {
            res.status(404).json({ error: 'Section not found' });
            return;
        }

        // Swap the order of the sections
        const tempOrder = section1.order;
        section1.order = section2.order;
        section2.order = tempOrder;

        // Save the updated template
        await template.save();

        res.status(200).json({ message: 'Section order swapped successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


export const swapQuestions = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { templateId, sectionId } = req.params;
        const { questionId1, questionId2 } = req.body;

        const parsedTemplateId = parseInt(templateId);
        const parsedSectionId = parseInt(sectionId);

        if (isNaN(parsedTemplateId) || isNaN(parsedSectionId)) {
            res.status(400).json({ error: 'Invalid templateId or sectionId format' });
        }

        const template = await FeedbackTemplate.findById(parsedTemplateId);

        let section: any;
        if (!template) {
            res.status(404).json({ error: 'Template not found' });
        } else {
            section = template.sections.find((section) => section.id === parsedSectionId);
        }

        if (!section) {
            res.status(404).json({ error: 'Section not found' });
        }

        const question1 = section.fields.find((field: any) => field.id === questionId1);
        const question2 = section.fields.find((field: any) => field.id === questionId2);

        if (!question1 || !question2) {
            res.status(404).json({ error: 'Question not found' });
        }

        const tempOrder = question1.order;
        question1.order = question2.order;
        question2.order = tempOrder;

        // Save the updated template
        if (template) await template.save();

        res.status(200).json({ message: 'Question order swapped successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


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

        const convertToQuestionAnswerFormField = (fields: any[]): QuestionAnswerFormField[] => {
            return fields.map((field, index) => {
                const convertedField: QuestionAnswerFormField = {
                    id: index + 1,
                    question: field.question,
                    order: field.order,
                    answerFormat: convertToAnswerFormat(field.answerFormat),
                };
                return convertedField;
            });
        };

        const convertToFeedbackFormat = (formats: any[]): FeedbackFormat[] => {
            return formats.map((format, index) => {
                const convertedFormat: FeedbackFormat = {
                    id: index + 1,
                    title: format.title,
                    order: format.order,
                    questions: convertToQuestionAnswerFormField(format.fields),
                };
                return convertedFormat;
            });
        };
        const convertToFeedbackTemplate = (feedbackForm: FeedbackFormBodySchema) => {
            let feedbackTemplate: any = {
                templateName: feedbackForm.feedbackFormName,
                feedbackType: new Types.ObjectId(feedbackForm.feedbackType),
                sections: convertToFeedbackFormat(feedbackForm.sections),
                isActive: false,
            };

            if (roleId === 2 && businessAdminId) {
                feedbackTemplate = {
                    ...feedbackTemplate,
                    templateType: TemplateType.CUSTOM,
                    businessAdminId: businessAdminId
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
export const createTemplate = asyncHandler(async (req: Request, res: Response) => {
    try {

        const businessAdminId: number = req.user?.id;
        const roleId: number = req.user?.role;

        const formData: FeedbackFormBodySchema = req.body;

        const data = await validateAndTransformForm(roleId, businessAdminId, formData);

        console.log(JSON.stringify(data, null, 2))

        if (roleId === 2) {
            await FeedbackTemplate.create(data);
        } else if (roleId === 1) {
            await FeedbackDefaultTemplate.create(data);
        }
        res.status(200).json({ message: 'Feedback form created successfully' });

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
});


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
