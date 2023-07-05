import { Request, Response, response } from 'express'
import FeedbackResponse from '../model/feedback_response_model'
import FeedbackModel from '../model/feedback_model';
import { status_codes, auto_response } from '../constants/constants';

// create response 
export const create_Response = async (req: Request, res: Response) => {
    try {
      const { feedback_id, response } = req.body;
      // Check if required fields are present
      if (!feedback_id || !response) {
        res.status(400).json({ error: status_codes[400] });
        return;
      }
      // Check if feedback exists
      const feedbackExists = await FeedbackModel.exists({ _id: feedback_id });
      if (!feedbackExists) {
        res.status(404).json({ error: status_codes[404] });
        return;
      }
      // Save the feedback response
      const feedbackResponse = await FeedbackResponse.create({ feedback_id, response });
      res.status(201).json(feedbackResponse);
    } catch (error) {
      res.status(500).json({ error: status_codes[500] });
    }
  };

// Delete Response
export const deleteResponse = async (req: Request, res: Response) => {
    try {
      const response_id = req.params.id;
      if (!response_id) {
        res.status(400).json({ error: status_codes[400] });
        return;
      }
      const response = await FeedbackResponse.findByIdAndDelete(response_id);
      if (!response) {
        res.status(404).json({ error: status_codes[404] });
        return;
      }
      res.status(200).json({ message: status_codes[200] });
    } catch (error) {
      res.status(404).json({ error: status_codes[404] });
    }
  };
  
  // Get Response by Feedback ID
  export const getResponse = async (req: Request, res: Response) => {
    try {
      const feedback_id = req.query.feedback_id as string;
      if (!feedback_id) {
        res.status(400).json({ error: status_codes[400] });
        return;
      }
      const response_data = await FeedbackResponse.findOne({ feedback_id });
      if (!response_data) {
        res.status(404).json({ error: status_codes[404] });
        return;
      }
      res.status(200).json(response_data);
    } catch (error) {
      res.status(404).json({ error: status_codes[404] });
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
          generatedResponse = auto_response.good;
        } else {
          generatedResponse = auto_response.inconvinient;
        }
        
        if (!response) {
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          
          if (JSON.stringify(feedback.createdAt) < JSON.stringify(sevenDaysAgo)) {
            await FeedbackResponse.create({ feedback_id: feedback._id, response: generatedResponse });
          }
        }
      }
      console.log(status_codes[200]);
    } catch (error) {
      console.error(status_codes[500], error);
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
      res.status(400).json({error:status_codes[400]})
    }
  }