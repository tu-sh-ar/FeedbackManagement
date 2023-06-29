// creating the feedback controller 
import mongoose from 'mongoose'
import { Request, Response } from 'express'
import FeedbackModel from '../model/feedback_model'
import DeliveryAgent from '../model/delivery_agent_model'
import { feedback_type } from '../middlewares/enums/feedback_type_enum' 
import FeedbackTemplate from '../model/feedback_template_model'

// create a feedback
export const getFeedbacks = async( req:Request, res:Response ) => {

    const page = parseInt(req.query.page as string) || 1; // Default to page 1 if not provided
    const size = parseInt(req.query.size as  string) || 10; // Default to 10 feedbacks per page if not provided
  try {
    // Count total feedbacks
    const totalCount = await FeedbackModel.countDocuments();

    // Calculate pagination values
    const totalPages = Math.ceil(totalCount / size);
    const skip = (page - 1) * size;

    // Get feedbacks based on pagination parameters
    await FeedbackModel.find()
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .skip(skip)
      .limit(size)
      .then((data) => {
        const updated_feedback: Array<object> = data.map((feedback) => ({
          feedback_id: feedback._id,
          user_id: feedback.user_id,
          product_id: feedback?.product_id,
          rating: feedback.rating,
          comment: feedback?.comment,
          review: feedback?.additional_fields,
          QA: feedback?.qas,
          created_at: feedback.createdAt,
          updated_at: feedback.updatedAt,
        }));

        const response = {
          feedbacks: updated_feedback,
          currentPage: page,
          totalPages: totalPages,
          totalFeedbacks: totalCount,
        };

        res.status(200).send(response);
      })
      .catch((err) => res.status(404).send(err));
  } catch (error) {
    res.status(500).send("Internal Server Error");
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
        const user_id = req.user?.id;  // auth token payload 
        // const delivery_agent_data = DeliveryAgent.findOne({user_id:user_id})
        // feedback_data.deliveryagent_id = delivery_agent_data._id;
    
         //searhing for an existing template for the given template type
        const feedback_template = await FeedbackTemplate.findOne({type:template_type});

        // check if the user exists and then make the response 
        const new_feedback_data = {...feedback_data, 
            //client_id:feedback_template?.client_id, 
            template_id:feedback_template?._id,
            // user_id:user_id,
            feedback_type:feedback_type.UserToClient
        }
        
        await FeedbackModel.create(new_feedback_data)
        .then(data => res.status(201).send(data))
        .catch(err => res.status(400).send(err))

    } catch (error) {
        res.status(500).send("internal server error")
    }
}

// create a feedback
export const updateFeedback = async( req:Request, res:Response ) => {
    const feedback_data = req.body
    const id = req.params.id
    try {

        FeedbackModel.findByIdAndUpdate(id , feedback_data)
        .then(data => res.status(200).send("Feedback Updated Successfully"))
        .catch(err => res.status(404).send("No Feedback Found with the given id "))

    } catch (error) {
        res.status(500).send(`Internal Server Error : ${error}`)
    }
}

// delete a feedback
export const deleteFeedback = async( req:Request, res:Response ) => {
    const feedback_id = req.params.id

    try {
        
        FeedbackModel.findByIdAndDelete(feedback_id)
        .then(data => res.status(200).send("Deleted Feedback"))
        .catch(err => res.status(404).send("No Feedback Found"))

    } catch (error) {
        res.status(500).send("Internal Server Error")
        
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
            review:feedback?.additional_fields,
            QA:feedback?.qas,
            created_at:feedback.createdAt,
            updated_at:feedback.updatedAt
        }

        if(Object.keys(new_feedback).length !=0){
            res.status(200).send(new_feedback)
        }else{
            res.status(404).json({error:"No Feedback Found"});
        }
    } catch (error) {
        res.status(500).json({error:`Internal Server Error: ${error}`})
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
        res.status(400).json({error:"Invalid range, Bad Request"})
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

            res.status(200).json({
                product_id:product_id,
                AvgRating:average_rating,
                feedbacks:updated_feedbacks
            })
        } else {
            res.status(404).json({error:"No feedbacks found for the product"})
        }
    } catch (error) {
        res.status(500).json({error:"Feedbacks for product id not exist"})
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
        
        feedbacks.forEach(feedback => {
            const new_feedback:object = {
                feedback_id: feedback._id,
                user_id: feedback.user_id,
                product_id:feedback?.product_id,
                rating:feedback.rating,
                comment:feedback?.comment,
                review:feedback?.additional_fields,
                QA:feedback?.qas,
                created_at:feedback.createdAt,
                updated_at:feedback.updatedAt
            }
            
            updated_feedback.push(new_feedback);
        })
        res.send(updated_feedback)
            
    } catch (error) {
        res.status(500).json({error:"Feedbacks not fetched"})
    }
}


//testing purpose 
export const getAllFeedbacks = async(req:Request, res:Response) => {
    let updated_feedback:Array<object>=[];
    try {
        const feedbacks = await FeedbackModel.find().sort({createdAt:-1})
        feedbacks.forEach(feedback => {
            const new_feedback:object = {
                feedback_id: feedback._id,
                user_id: feedback.user_id,
                product_id:feedback?.product_id,
                rating:feedback.rating,
                comment:feedback?.comment,
                review:feedback?.additional_fields,
                QA:feedback?.qas,
                created_at:feedback.createdAt,
                updated_at:feedback.updatedAt
            }

            updated_feedback.push(new_feedback);
        })
        res.status(200).send(updated_feedback);
    } catch (error) {
        res.status(500).send(error)
    }
}