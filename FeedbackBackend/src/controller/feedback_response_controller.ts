import { Request, Response } from 'express'
import FeedbackResponse from '../model/feedback_response_model'



// creat Response 
export const create_Response = async( req:Request, res:Response ) => {
    const response_data = req.body;

    try {
        // saving the feeedback
        FeedbackResponse.create(req.body)
        .then(data => res.status(201).send(data))
        .catch(err => res.status(401).send("Response not Saved"))

    } catch (error) {
        
        res.status(500).send("Internal Server Error")

    }
}