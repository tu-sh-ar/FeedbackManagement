import Client from '../model/client_model'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

// create user 
export const userSignup = async( req:Request, res:Response )  => {
    const user_details = req.body;
    await Client.create(user_details)
    .then(user => res.status(201).send(user))
    .catch(err => res.status(400).send(err))
}

// user login
export const user_login = async(req:Request, res:Response) => {
    const { email, password } = req.body;
    await Client.findOne({email:email})
    .then(data => {
        const token = jwt.sign({
            user:{
                email:data?.email,
                id:data?._id
            }
        },'secret',{expiresIn:"100m"});
        res.status(200).send(token)
    })
    .catch(err => res.status(404).send("no user found"))
}