import { Request, Response, response } from 'express'
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
      const response_id = req.params.id;
  
      if (!response_id) {
        res.status(400).json({ error: 'Bad Request: Missing feedback ID' });
        return;
      }
  
      const response = await FeedbackResponse.findByIdAndDelete(response_id);
      if (!response) {
        res.status(404).json({ error: 'Response not found' });
        return;
      }
  
      res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
      res.status(404).json({ error: 'Invalid Response Id , Bad request ' });
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
      res.status(404).json({ error: 'No Feedback Response data found' });
    }
  };

  // generate automatic  response 
  export const createMissingResponse = async () => {
    try {
      const feedbacks = await FeedbackModel.find();
  
      for (const feedback of feedbacks) {
        const response = await FeedbackResponse.findOne({ feedback_id: feedback._id });
  
        let generatedResponse: string;
        if (feedback.rating > 3) {
          generatedResponse = "Thank you for your feedback.";
        } else {
          generatedResponse = "Sorry for the inconvenience. We will look into the issue.";
        }
        
        if (!response) {
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          
          if (JSON.stringify(feedback.createdAt) < JSON.stringify(sevenDaysAgo)) {
            await FeedbackResponse.create({ feedback_id: feedback._id, response: generatedResponse });
          }
        }
      }
  
      console.log("Automatic responses generated successfully.");
    } catch (error) {
      console.error("Error in automatic response generation:", error);
    }
  };
  
//update feedback response 
  export const updateResponse = async(req:Request,res:Response) => {
    const response_data = req.body;
    const response_id = req.params.id;
    try {
      const data = await  FeedbackResponse.findByIdAndUpdate(response_id,response_data);
      res.status(200).send(data)
    } catch (error) {
      res.status(400).json({error:"Invalid response Id , Update Failed"})
    }
  }