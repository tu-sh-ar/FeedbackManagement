// creating the feedback controller 
import { Request, Response } from 'express'
import FeedbackModel from '../model/feedback_model' 
import DeliveryAgentFeedback from '../model/delivery_agent_model'
import User from '../model/user_model'
import { status_codes } from '../constants/constants'
import { buildErrorResponse, buildObjectResponse, buildResponse } from '../utils/responseUtils';

// create a feedback
export const getFeedbacks = async (req:Request, res:Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const size = parseInt(req.query.size as string) || 10;

    if(page<1 || size>25 || size<1){
        res.status(400).json({error: status_codes[400]});
    }
    try {
      const totalCount = await FeedbackModel.countDocuments();
      const totalPages = Math.ceil(totalCount / size);
      const skip = (page - 1) * size;
  
      const feedbacks = await FeedbackModel.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(size);
  
      const updated_feedback = await Promise.all(
        feedbacks.map(async (feedback) => {
          const user = await User.findOne({ _id: feedback.user_id });
          return {
            feedback_id: feedback._id,
            user_id: feedback.user_id,
            user_name: user ? user.name : null,
            product_id: feedback.product_id,
            rating: feedback.rating,
            comment: feedback.comment,
            QA: feedback.qas,
            created_at: feedback.createdAt,
            updated_at: feedback.updatedAt,
          };
        })
      );
  
      const response = {
        feedbacks: updated_feedback,
        currentPage: page,
        totalPages: totalPages,
        totalFeedbacks: totalCount,
      };
  
      return buildObjectResponse(res, response);
    } catch (error) {
      console.log(error)
      return buildErrorResponse(res, "Feedbacks not fetched", 500);
    }
  };

// create a feedback
export const createFeedback = async( req:Request, res:Response ) => {

    const feedback_data = req.body;
    const template_type = req.body?.template_type;
    
    // gettting user credentials 
    // const user_id = req.user?.id;

    try {

        // getting the user_id from the auth 
        // const user_id = req.user?.id;  // auth token payload 
        // const delivery_agent_data = DeliveryAgent.findOne({user_id:user_id})
        // feedback_data.deliveryagent_id = delivery_agent_data._id;
    
         //searhing for an existing template for the given template type
        // const feedback_template = await FeedbackTemplate.findOne({type:template_type});

        // check if the user exists and then make the response 
        const new_feedback_data = {...feedback_data, 
            // client_id:feedback_template?.client_id, 
            // template_id:feedback_template?._id,
            // user_id:user_id
        }
        
        const newFeedback = await FeedbackModel.create(new_feedback_data)
        if(newFeedback){
            return buildObjectResponse(res, newFeedback);
        }

    } catch (error) {
        console.log(error)
        return buildErrorResponse(res, "Feedback not created", 500);
    }
}

// create a feedback
export const updateFeedback = async( req:Request, res:Response ) => {
    const feedback_data = req.body
    const id = req.params.id
    try {

        FeedbackModel.findByIdAndUpdate(id , feedback_data)
        .then(data => res.status(200).send(status_codes[200]))
        .catch(err => res.status(404).send(err))

    } catch (error) {
        console.log(error)
        return buildErrorResponse(res, "Feedbacks not updated", 500);
    }
}

// delete a feedback
export const deleteFeedback = async( req:Request, res:Response ) => {
    const feedback_id = req.params.id

    try {
        
        FeedbackModel.findByIdAndDelete(feedback_id)
        .then(data => res.status(200).send( status_codes[200]))
        .catch(err => res.status(404).json({error: status_codes[404]}))

    } catch (error) {
        console.log(error)
        return buildErrorResponse(res, "Feedbacks not deleted", 500);
        
    }
}

// get feedback by id 
export const get_feedback = async(req:Request, res:Response) => {
    const feedback_id = req.params.id;

    try {
        const data = await FeedbackModel.findById(feedback_id);
        const feedback = JSON.parse(JSON.stringify(data));

        const new_feedback:object = {
            feedback_id: feedback._id,
            user_id: feedback.user_id,
            product_id:feedback?.product_id,
            rating:feedback.rating,
            comment:feedback?.comment,
            QA:feedback?.qas,
            created_at:feedback.createdAt,
            updated_at:feedback.updatedAt
        }

        if(Object.keys(new_feedback).length !=0){
            return buildObjectResponse(res, new_feedback)
        }else{
            return buildErrorResponse(res,"Feedback not found for given Id", 404)
        }
    } catch (error) {
        console.log(error)
        return buildErrorResponse(res, "Feedbacks not fetched", 500);
    }
}

// get feedbacks based on product id
export const getPoductFeedbacks = async(req:Request, res:Response) => {
     
    const product_id = req.params.product_id as string;
    const range = req.query.range as string;
    const month_range = parseInt(range);
    const current_date = new Date();
    current_date.setMonth(current_date.getMonth() - month_range);

    if(!range || month_range<1 ){
       return buildErrorResponse(res, "invalid month range", 400);
        return;
    }

    try {
        const feedbacks = await FeedbackModel.find({
            product_id:product_id,
            createdAt: { $gte: current_date },
        });

        if(feedbacks.length){
            const updated_feedbacks = feedbacks.map(feedback => {
                return {
                    feedback_id:feedback._id,
                    comment:feedback.comment,
                    rating:feedback.rating
                }
            })

            // find average ratings 
            const ratings = feedbacks.map((feedback) => feedback.rating);
            const sum = ratings.reduce((acc, rating) => acc + rating, 0);
            const average_rating = sum / ratings.length;

            const responseObj = {
                product_id:product_id,
                AvgRating:average_rating,
                feedbacks:updated_feedbacks
            }
            return buildObjectResponse(res, responseObj)
        } else {
            return buildErrorResponse(res, "No Feedbacks found", 404)
        }
    } catch (error) {
        console.log(error)
        return buildErrorResponse(res, "Internal Server error", 500);
    }
}

// filter api according to date 

export const getFeedbacksByDate = async(req:Request, res:Response) => {
    const date = { 
         start:req.query.start as string ,
         end:req.query.end as string
        };
    let updated_feedback:Array<object>=[];
    try {
        const feedbacks = await FeedbackModel.find({
            createdAt:{
                $gte:new Date(date.start),
                $lte:new Date(date.end)
            }
        })
        
        feedbacks.forEach(async feedback => {
            const user_data = await User.findById(feedback.user_id);
            const new_feedback:object = {
                feedback_id: feedback._id,
                user_id: feedback.user_id,
                user_name: user_data?.name,
                product_id:feedback?.product_id,
                rating:feedback.rating,
                comment:feedback?.comment,
                QA:feedback?.qas,
                created_at:feedback.createdAt,
                updated_at:feedback.updatedAt
            }
            
            updated_feedback.push(new_feedback);
        })
        return buildObjectResponse(res, updated_feedback)
            
    } catch (error) {
        console.log(error)
        return buildErrorResponse(res, "Feedbacks not fetched", 500);
    }
}


//testing purpose 
export const getAllFeedbacks = async(req:Request, res:Response) => {
    try {
        const feedbacks = await FeedbackModel.find().sort({ createdAt: -1 });
    
        const updated_feedback: Array<object> = [];
        for (const feedback of feedbacks) {
          const user_data = await User.findById(feedback.user_id);
          const new_feedback: object = {
            feedback_id: feedback._id,
            user_id: feedback.user_id,
            user_name: user_data?.name,
            product_id: feedback?.product_id,
            // product_name
            rating: feedback.rating,
            comment: feedback?.comment,
            QA: feedback?.qas,
            created_at: feedback.createdAt,
            updated_at: feedback.updatedAt,
          };
          updated_feedback.push(new_feedback);
        }
        res.status(200).send(updated_feedback);
      } catch (error) {
        res.status(500).json({error: status_codes[500]});
      }
    };

// delivery agent feedback apis 
export const getDeliveryAgentFeedbacks = async(req:Request, res:Response ) => {
    const agent_id = parseInt(req.params.agent_id);
    try {
        const feedback = await DeliveryAgentFeedback.findOne({deliveryagent_id:agent_id})
        const updated_feedback ={ 
            agent_id:agent_id,
            rating:feedback?.rating,
            comment:feedback?.comment,
        }
            return buildObjectResponse(res,updated_feedback)
        
    } catch (error) {
        console.log(error)
        return buildErrorResponse(res, "Feedbacks not fetched", 500);
    }
}

export const createDeliveryAgentFeedbacks = async(req:Request, res:Response ) => {
    const data = req.body;
    try {
        const feedback = await DeliveryAgentFeedback.create(data)
            return buildObjectResponse(res,feedback)
        
    } catch (error) {
        console.log(error)
      return buildErrorResponse(res, "Feedback not created", 500);
    }
}