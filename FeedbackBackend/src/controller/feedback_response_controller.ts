import { Request, Response } from 'express'
import FeedbackResponse from '../model/feedback_response_model'



// creat Response 
export const create_Response = async( req:Request, res:Response ) => {
    const response_data = req.body;

    try {
        // saving the feeedback
        await FeedbackResponse.create(req.body)
        .then(data => res.status(201).send(data))
        .catch(err => res.status(401).send("Response not Saved"))

    } catch (error) {
        
        res.status(500).send("Internal Server Error")

    }
}

// // update response 
// export const update_response = async(req:Request, res:Response) => {
//     const updated_response = req.body;
//     const response_id = req.params.id;

//     try {
//         const updated_data = await FeedbackResponse.findByIdAndUpdate(response_id, update_response);
//         if(Object.keys(updated_data).length != 0){
//             res.status(201).send(updated_data)
//         }
//     } catch (error) {
//         res.status(500).json({error: `Internal Server Error ${error}`})
//     }
// }

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