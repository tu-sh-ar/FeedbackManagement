// feedback template controller 
import { Request, Response } from 'express';
import FeedbackTemplate, { AnswerFormat, FeedbackFormat, QuestionAnswerFormField } from "../model/feedback_template_model";
import asyncHandler from 'express-async-handler'
import { status_codes } from '../constants/constants';
import { validateFormSchema } from '../middlewares/validations/dynamic-feedback-form-validation';
import { TemplateType } from '../middlewares/enums/answerFormat_enum';
import * as yup from 'yup';
import { FeedbackFormBodySchema } from '../constants/interface';


// get custom feedback templates 
export const getTemplates = asyncHandler(async (req: Request, res: Response) => {

    try {
        const businessAdminId: unknown = req.user?.id;

        // Convert clientId to a number if possible
        let parsedClientId: number | undefined;
        if (typeof businessAdminId === 'string') {
            parsedClientId = parseInt(businessAdminId, 10);
            if (isNaN(parsedClientId)) {
                res.status(400).json({ error: 'clientId should be a number or convertible to a number' });
            }
        } else if (typeof businessAdminId !== 'number') {
            res.status(400).json({ error: 'clientId should be a number or convertible to a number' });
        }

        // Fetch all feedback templates for the given business ID
        const feedbackTemplates = await FeedbackTemplate
            .find({ clientId: parsedClientId }, { clientId: 0, businessCategory: 0, templateType: 0 })
            .lean().exec();

        // Segregate the feedback templates based on business type
        const segregatedFeedbackForms: any = {};
        feedbackTemplates.forEach((feedbackTemplate) => {
            const { businessType } = feedbackTemplate;
            if (!segregatedFeedbackForms[businessType]) {
                segregatedFeedbackForms[businessType] = feedbackTemplate;;
            } else {
                segregatedFeedbackForms[businessType].push(feedbackTemplate);
            }
        });

        res.status(200).send(segregatedFeedbackForms);
    } catch (error) {
        res.status(500).json({ error: status_codes[500] });
    }
})


export const getDefaultTemplates = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { businessCategory } = req.params;
        const templates = await FeedbackTemplate.find({
            businessCategory: Number(businessCategory),
            templateType: TemplateType.DEFAULT})
            .lean()
            .exec();

        res.status(200).send(templates);

    } catch (error) {
        res.status(500).json({ error: status_codes[500] });
    }
})


export const activateTemplate = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { businessAdminId, businessType, templateId } = req.params;

        // Validate and transform the parameters
        const parsedBusinessAdminId = parseInt(businessAdminId);
        const parsedBusinessType = parseInt(businessType);
        const parsedTemplateId = parseInt(templateId);

        // Check if the transformation was successful
        if (isNaN(parsedBusinessAdminId) || isNaN(parsedBusinessType) || isNaN(parsedTemplateId)) {
            res.status(400).json({ error: 'Invalid parameter format' });
        }
        await FeedbackTemplate.updateMany(
            {
                businessAdminId: parsedBusinessAdminId,
                businessType: parsedBusinessType,
                isActive: true
            },
            { isActive: false }
        );

        await FeedbackTemplate.findByIdAndUpdate(parsedTemplateId, { isActive: true, used: true });

        res.json({ message: 'Template activated successfully' });

    } catch (error) {
        res.status(500).json({ error: status_codes[500] });
    }
})


const validateAndTransformForm = async (
    roleId: number,
    businessAdminId: number,
    formData: FeedbackFormBodySchema,) => {
    try {
        await validateFormSchema(formData)

        const convertToAnswerFormat = (answerFormat: any[]): AnswerFormat[] => {
            return answerFormat.map((format) => {
                const convertedFormat: AnswerFormat = {
                    type: format.type,
                    required: format.required,
                };
                if (format.options) {
                    convertedFormat.options = format.options;
                }
                if (format.upperBound) {
                    convertedFormat.upperBound = format.upperBound;
                }
                return convertedFormat;
            });
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
                    fields: convertToQuestionAnswerFormField(format.fields),
                };
                return convertedFormat;
            });
        };
        const convertToFeedbackTemplate = (feedbackForm: FeedbackFormBodySchema) => {
            let feedbackTemplate: any = {
                templateName: feedbackForm.feedbackFormName,
                templateType: roleId === 1 ? TemplateType.DEFAULT : TemplateType.CUSTOM,
                businessType: feedbackForm.businessType,
                formats: convertToFeedbackFormat(feedbackForm.formats),
                isActive: true,
            };

            if (roleId === 2 && businessAdminId) {
                feedbackTemplate = {
                    ...feedbackTemplate,
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

        await FeedbackTemplate.create(data);
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


// delete a template 
export const deleteTemplate = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { templateId } = req.params;

        const parsedTemplateId = parseInt(templateId);
    
        if (isNaN(parsedTemplateId)) {
            res.status(400).json({ error: 'Invalid templateId format' });
        }
    
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
