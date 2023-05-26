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


// Delete Response
export const deleteResponse = async (req: Request, res: Response) => {
    try {
      const feedback_id = req.params.id;
  
      if (!feedback_id) {
        res.status(400).json({ error: 'Bad Request: Missing feedback ID' });
        return;
      }
  
      const response = await FeedbackResponse.findByIdAndDelete(feedback_id);
      if (!response) {
        res.status(404).json({ error: 'Response not found' });
        return;
      }
  
      res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Get Response by Feedback ID
  export const getResponse = async (req: Request, res: Response) => {
    try {
      const feedback_id = req.query.feedback_id as string;
  
      if (!feedback_id) {
        res.status(400).json({ error: 'Bad Request: Missing feedback ID' });
        return;
      }
  
      const response_data = await FeedbackResponse.findOne({ feedback_id });
      if (!response_data) {
        res.status(404).json({ error: 'No response found' });
        return;
      }
  
      res.status(200).json(response_data);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };