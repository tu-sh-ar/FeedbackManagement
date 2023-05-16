// feedback template controller 
import { Request , Response , NextFunction } from 'express';
import FeedbackTemplate from "../model/feedback_template_model";

import asyncHandler from 'express-async-handler'


// get feedback templates 
export const getTemplates =  asyncHandler(async( req:Request , res:Response ) => {

    // const client_id = req.user?.id;
    
    try {
        
        // fetching data basis of client Id
        const templates = await FeedbackTemplate.find()

        if(templates.length)
            res.status(200).send(templates);
        else
            res.status(404).send("No feedback templates found")

    } catch (error) {

        res.status(500).send(`Error in fetching templates : ${error}`)

    }                      
})

// create new feedback template 
export const createtemplate = asyncHandler(async( req:Request , res: Response) => {

    // autorisation and authentication 
    const client_id = req.user?.id; 
    const feedback_template_data = req.body;
    
    
    try {
         const new_data = {...feedback_template_data, client_id:client_id}

        //creating new template for feedback 
        FeedbackTemplate.create(new_data)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(400).send(err))
         
    } catch (error) {

        res.status(500).send("Error in creating template")

    }
})

// update template 
export const updateTemplate = asyncHandler(async( req:Request , res:Response) => {
    const template_id = req.params.id;

    try {

        await FeedbackTemplate.findByIdAndUpdate(template_id, req.body)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(404).send("No feedback template found "))
        
    } catch (error) {
        res.status(500).send("Error occured in updating the template")
    }

})


// delete a template 
export const deleteTemplate = asyncHandler(async(req:Request, res:Response) => {

    const template_id = req.params.id;
    try {
        
        FeedbackTemplate.findByIdAndDelete(template_id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(404).send(err))

    } catch (error) {
        res.status(500).send(error)
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

  
//   {
//     "type": 3,
//     "fields": {
//       "venue": "string",
//       "organization": "string"
//     },
//     "requiredFields": {
//       "rating": true,
//       "feedback_type": false,
//       "feedback_language": false
//     },
//     "qas": {
//       "Q1": "Were the event activities well-organized?",
//        "Q2": "Did the event meet your expectations?",
//        "Q3": "How likely are you to attend future events organized by us?"
//     }
//   }
  