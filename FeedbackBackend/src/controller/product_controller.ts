import Product from '../model/product_model'
import { Request, Response } from 'express'

export const getProduct = async(req:Request, res:Response) => {
    const product_id = req.params.id;

    await Product.findById(product_id)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(404).send(err))
}


export const createProduct = async(req:Request, res:Response) => {
    const product_data = {
        name:"Nike Shoes",
        descripton:"Sports shoes",
        client_id:"645cd3d54f7c08e19e4e9c0e"
    }

    await Product.create(product_data)
    .then(data => res.status(201).send(data))
    .catch(err => res.status(400).send(err))
}