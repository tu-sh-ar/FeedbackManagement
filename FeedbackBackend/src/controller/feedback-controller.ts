// creating the feedback controller 
import { Request, Response } from 'express'
import FeedbackModel from '../model/feedback_model'
import { feedback_type } from '../middlewares/enums/feedback_type_enum' 
import FeedbackTemplate from '../model/feedback_template_model'

// create a feedback
export const getFeedback = async( req:Request, res:Response ) => {

    let updated_feedback:Array<object>=[];

    try {

        await FeedbackModel.find()
        .then(data => {
            data.forEach(feedback => {
                const new_feedback:object = {
                    user:{
                        id:feedback.user_id,
                        name:"yash",
                        email:"yash@yash.com"
                    },
                    product:{
                        id:feedback.product_id,
                        name:"Nike Shoes"
                    },
                    rating:feedback.rating,
                    Comment:feedback?.comment,
                    review:feedback?.additional_fields,
                    QA:feedback?.qas
                }
                
                updated_feedback.push(new_feedback);
            })
            res.status(200).send(updated_feedback);
        })
        .catch(err => res.status(404).send(err))

    } catch (error) {
        res.status(500).send("internal Server error")
    }
}

// create a feedback
export const createFeedback = async( req:Request, res:Response ) => {

    const feedback_data = req.body;
    const template_type = req.body?.template_type;
    
    // gettting user credentials 
    const user_id = req.user?.id;

    try {

        // getting the user_id from the auth 
        // const user_id = req.user.id;  // auth token payload 
        // const delivery_agent_data = DeliveryAgent.findOne({user_id:user_id})
        // feedback_data.deliveryagent_id = delivery_agent_data._id;
    
         //searhing for an existing template for the given template type
        const feedback_template = await FeedbackTemplate.findOne({type:template_type});

        // check if the user exists and then make the response 
        const new_feedback_data = {...feedback_data, 
            client_id:feedback_template?.client_id, 
            template_id:feedback_template?._id,
            user_id:user_id,
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