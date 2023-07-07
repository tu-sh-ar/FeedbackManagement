// feedback template controller 
import { Request , Response , NextFunction } from 'express';
import FeedbackTemplate from "../model/feedback_template_model";
import asyncHandler from 'express-async-handler'
import { status_codes } from '../constants/constants';

// get feedback templates 
export const getTemplates =  asyncHandler(async( req:Request , res:Response ) => {

    const client_id = req.user?.id ;
    try {
        // fetching data basis of client Id
        const templates = await FeedbackTemplate.find({
            client_id:client_id
        })
        if(templates.length)
            res.status(200).send(templates);
        else
            res.status(404).json({ error: status_codes[404] });

    } catch (error) {
        res.status(500).json({ error: status_codes[500] });
    }                      
})

// create new feedback template 
export const createTemplate = asyncHandler(async (req: Request, res: Response) => {

    try {
      const client_id = req.user?.id;
      const business_type = req.user?.businessCategory as String;
      const feedback_template_data = req.body;
  
      if (!client_id || !feedback_template_data || !business_type) {
        res.status(400).json({ error: status_codes[400] });
        return;
     }
      //if(req.user?.role === "admin"){
        const new_data = {
             ...feedback_template_data,
              client_id ,
              business_type
            };
        // Create a new template for feedback
        const createdTemplate = await FeedbackTemplate.create(new_data);
        res.status(200).json(createdTemplate);
      //}

    } catch (error) {
      res.status(500).json({ error: status_codes[500] });
    }
  });

// update template 
export const updateTemplate = asyncHandler(async( req:Request , res:Response) => {
    const template_id = req.params.id;
    const template_data = req.body;
    try {
        await FeedbackTemplate.findByIdAndUpdate(template_id, template_data)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(404).json({error: status_codes[404]}))
    } catch (error) {
        res.status(500).send({error: status_codes[500]})
    }
})

// delete a template 
export const deleteTemplate = asyncHandler(async(req:Request, res:Response) => {
    const template_id = req.params.id;
    try {
        await FeedbackTemplate.findByIdAndDelete(template_id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(404).json({error: status_codes[404]}))
    } catch (error) {
        res.status(500).json({error: status_codes[500]})
    }
})
