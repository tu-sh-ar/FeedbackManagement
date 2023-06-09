import Product from '../model/product_model'
import { Request, Response } from 'express'
import FeedbackModel from '../model/feedback_model';

export const getProduct = async(req:Request, res:Response) => {

    const product_id = req.params.id;
    let average_rating:any;

    try {

        const feedback_data = await FeedbackModel.find({product_id:product_id})
        
        const ratings = feedback_data.map((feedback) => feedback.rating);
        const sum = ratings.reduce((acc, rating) => acc + rating, 0);
        average_rating = sum/ratings.length;
        
        const product_data = await Product.findById(product_id);
        if(!product_data){
            res.status(404).json({error:"No product found"})
            return;
        }

        const updated_data = {...product_data.toObject() , avg_rating:average_rating}
        res.status(200).send(updated_data);

        
    } catch (error) {
        
        res.status(500).send(error);
    }
}

export const createProduct = async(req:Request, res:Response) => {
    const product_data = req.body;

    await Product.create(product_data)
    .then(data => res.status(201).send(data))
    .catch(err => res.status(400).send(err))
}

