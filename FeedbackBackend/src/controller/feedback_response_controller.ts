import { Request, Response } from 'express'
import FeedbackResponse from '../model/feedback_response_model'
import FeedbackModel from '../model/feedback_model';

// creat Response 
export const create_Response = async( req:Request, res:Response ) => {
    const { feedback_id, response } = req.body;


    try {
        // saving the feeedback response
        await FeedbackResponse.create({ feedback_id, response } )
        .then(data => res.status(201).json(data))
        .catch(err => res.status(401).send("Response not Saved"))

    } catch (error) {
        
        res.status(500).send("Internal Server Error")

    }
}


// delete response 
export const delete_response = async(req:Request, res:Response) => {
    const feedback_id = req.params.id;

    try {

         FeedbackResponse.findByIdAndDelete(feedback_id)
        .then(data => res.status(200).send("deleted Succeessfully"))
        .catch(err => res.status(400).json({error:"bad Request"}))

    } catch (error) {

        res.status(500).json({error:`internal server error: ${error}`})

    }
}

// get response by feedback id
export const get_response = async(req:Request , res:Response) => {
    const feedback_id = req.query.feedback_id as String
   
    try {
        const response_data = await FeedbackResponse.findOne({feedback_id:feedback_id})
        
        if(!response_data){
            res.status(404).json({error:"No response Found"})
            return;
        }

        res.status(200).send(response_data)

    } catch (error) {

        res.status(500).json({error:`Internal Server Error: ${error}`})

    }
}