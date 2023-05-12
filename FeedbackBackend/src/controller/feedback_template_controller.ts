// feedback template controller 
import { Request , Response , NextFunction } from 'express';
import FeedbackTemplate from "../model/feedback_template_model";


// get feedback templates 
export const getTemplates =  async( req:Request , res:Response ) => {

    const client_id = req.user?.id;
    
    try {
        
        // fetching data 
        const templates = await FeedbackTemplate.find({client_id:client_id})

        if(templates.length)
            res.status(200).send(templates);
        else
            res.status(404).send("No feedback templates found")

    } catch (error) {

        res.status(500).send(`Error in fetching templates : ${error}`)

    }                      
}

// create new feedback template 
export const createtemplate = async( req:Request , res: Response) => {

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
}

// update template 
export const updateTemplate = async( req:Request , res:Response) => {
    const template_id = req.params.id;

    try {

        await FeedbackTemplate.findByIdAndUpdate(template_id, req.body)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(404).send("No feedback template found "))
        
    } catch (error) {
        res.status(500).send("Error occured in updating the template")
    }

}


// delete a template 
export const deleteTemplate = async(req:Request, res:Response) => {

    const template_id = req.params.id;
    try {
        
        FeedbackTemplate.findByIdAndDelete(template_id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(404).send(err))

    } catch (error) {
        res.status(500).send(error)
    }
}