// category wise feedback template controller 
import { Request, Response, NextFunction } from 'express';
import FeedbackCategoryTemplates from '../model/feedback_template_category_model';
import { status_codes } from '../constants/constants';
import { answerFormat } from '../middlewares/enums/answerFormat_enum';
import { TemplateType } from '../middlewares/enums/template_type';
import { CategoryType } from '../middlewares/enums/buisness_category_enum';
import { convertToObject } from 'typescript';

// get templates on the basis of business type 
export const getFeedbackTemplates = async (req: Request, res: Response) => {
    const buisness_type = req.user?.businessCategory as String;
    if(!buisness_type){
        res.status(400).json({error:status_codes[400]})
    }
    try {
        const templates = await FeedbackCategoryTemplates.find({ business_category_type: buisness_type })
        if (templates.length === 0) {
            return res.status(404).json({ error: status_codes[404] });
        }
        res.status(200).send(templates);
    } catch (error) {
        res.status(500).json({ error: status_codes[500] });
    }
}

// create category wise templates 
export const createCategoryTemplate = async (req: Request, res: Response) => {
    try {
        const template_data = req.body;
        const template = await FeedbackCategoryTemplates.create(template_data);
        if (Object.keys(template).length === 0) {
            return res.status(400).json({ error: status_codes[400] })
        }
        res.status(200).send(template);
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

// update a template based on the template id 
export const updateCategoryTemplate = async(req:Request, res:Response) => {
    try {
        const template_id = req.params.template_id;
        const template_data = req.body;
        const update = await FeedbackCategoryTemplates.findByIdAndUpdate(template_id,template_data)
        if (Object.keys(update?update:{}).length === 0) {
            return res.status(400).json({ error: status_codes[400] })
        }
        res.status(200).send(update);
    } catch (error) {
        res.status(500).json({ error: status_codes[500] })
    }
}

// deleting the category template 
export const deleteCategoryTemplate = async(req:Request, res:Response) => {
    try {
        const template_id = req.params.template_id;
        const del = await FeedbackCategoryTemplates.findByIdAndDelete(template_id)
        if (Object.keys(del?del:{}).length === 0) {
            return res.status(400).json({ error: status_codes[400] })
        }
        res.status(200).send(status_codes[200]);
    } catch (error) {
        res.status(500).json({ error: status_codes[500] })
    }
}

// get templates by template id and business_type
export const getTemplateById = async(req:Request,res:Response) => {
    try{
        const template_id = req.query.template_id;
        const business = req.user?.businessCategory as String;
        const template = await FeedbackCategoryTemplates.findOne({ _id:template_id, business_category_type:business })

        const mappedTemplate = {
            _id: template?._id,
            business_category_type: template?.business_category_type ? CategoryType[template.business_category_type] : null,
            template_type: template?.template_type ? TemplateType[template.template_type] : null,
            required_fields: template?.requiredFields,
            qas: template?.qas.map(qa => ({
              question: qa.question,
              answerFormat: qa.answerFormat ? answerFormat[qa.answerFormat] : null,
            })),
          };
        
        if (Object.keys(template?template:{}).length === 0) {
            return res.status(404).json({ error: status_codes[404] })
        }
        res.status(200).send(mappedTemplate);
    } catch(error){
        res.status(500).json({ error: status_codes[500] })
    }
}