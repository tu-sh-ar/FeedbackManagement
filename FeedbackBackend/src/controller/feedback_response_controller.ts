import { Request, Response } from 'express'
import FeedbackResponse from '../model/feedback_response_model'
import FeedbackModel from '../model/feedback_model';

// create response 
export const create_Response = async (req: Request, res: Response) => {
    try {
      const { feedback_id, response } = req.body;
  
      // Check if required fields are present
      if (!feedback_id || !response) {
        res.status(400).json({ error: 'Bad Request: Missing required fields' });
        return;
      }
  
      // Check if feedback exists
      const feedbackExists = await FeedbackModel.exists({ _id: feedback_id });
      if (!feedbackExists) {
        res.status(404).json({ error: 'Feedback not found' });
        return;
      }
  
      // Save the feedback response
      const feedbackResponse = await FeedbackResponse.create({ feedback_id, response });
      res.status(201).json(feedbackResponse);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

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

  // generate automatic  response 
  export const createMissingResponse = async(req:Request, res:Response) => {
    const Feedbacks = await FeedbackModel.find();
    Feedbacks.forEach(feedback => {
      FeedbackResponse.findOne({feedback_id:feedback._id})
      .then(data => {
          let response:string;
          if(feedback.rating>3){
            response = "ThanK You for your feedback"
          } else {
            response = "Sorry for the inconvenience , we will look into the issue"
          }
      })
    })
  }

