// feedback template controller 
import { Request , Response , NextFunction } from 'express';
import FeedbackTemplate from "../model/feedback_template_model";

import asyncHandler from 'express-async-handler'


// get feedback templates 
export const getTemplates =  asyncHandler(async( req:Request , res:Response ) => {

    //const client_id = req.user?.id;
    try {
        // fetching data basis of client Id
        const templates = await FeedbackTemplate.find({
            //client_id:client_id
        })
        if(templates.length)
            res.status(200).send(templates);
        else
            res.status(404).json({ error: 'No feedback templates found' });

    } catch (error) {

        res.status(500).json({ error: `Error in fetching templates: ${error}` });

    }                      
})

// create new feedback template 
export const createTemplate = asyncHandler(async (req: Request, res: Response) => {

    try {
      //const client_id = req.user?.id;
      const feedback_template_data = req.body;
  
    //   if (!client_id || !feedback_template_data) {
    //     res.status(400).json({ error: 'Bad Request: Missing required fields' });
    //     return;
    //  }
      //if(req.user?.role === "admin"){
        const new_data = {
             ...feedback_template_data,
             // client_id 
            };
        // Create a new template for feedback
        const createdTemplate = await FeedbackTemplate.create(new_data);
        res.status(200).json(createdTemplate);
      //}

    } catch (error) {
      res.status(500).json({ error: `Error in creating template: ${error}` });
    }
  });

// update template 
export const updateTemplate = asyncHandler(async( req:Request , res:Response) => {
    const template_id = req.params.id;
    const template_data = req.body;

    if(template_data.client_id){
        res.status(401).json({error:"client id cannot be updated"});
    }

    try {

        await FeedbackTemplate.findByIdAndUpdate(template_id, template_data)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(404).json({error:err}))
        
    } catch (error) {
        res.status(500).send({error:"Error in updating the template"})
    }

})


// delete a template 
export const deleteTemplate = asyncHandler(async(req:Request, res:Response) => {

    const template_id = req.params.id;
    try {
        
        FeedbackTemplate.findByIdAndDelete(template_id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(404).json({error:"No template exist with the given id"}))

    } catch (error) {
        res.status(500).json({error:`Template not deleted`})
    }
})
// {
//     "type": 1,
//     "fields": {
//       "quantity": "number",
//       "missing items": "number"
//     },
//     "requiredFields": {
//       "rating": true,
//       "feedback_type": false,
//       "feedback_language": false
//     },
//     "qas": {
//       "Q1": "How was the delivery experience of the product?",
//       "Q2": "Did the product meet your expectations?",
//       "Q3": "What improvements would you suggest for the product?"
//     }
//   }


//   {
//     "type": 2,
//     "fields": {
//       "response time": "number",
//       "customer support": "string"
//     },
//     "requiredFields": {
//       "rating": true,
//       "feedback_type": false,
//       "feedback_language": false
//     },
//     "qas": {
//          "Q1": "How would you rate the professionalism of our staff?",
//          "Q2": "Did our customer support team resolve your issue effectively?",
//          "Q3": "What improvements would you suggest for our services?"
//         }
//   }
