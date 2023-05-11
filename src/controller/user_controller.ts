import User from '../model/user_model'
import { Request, Response } from 'express'

// create user 
export const userSignup = async( req:Request, res:Response )  => {
    const user_details = req.body;
    await User.create(user_details)
    .then(user => res.status(201).send(user))
    .catch(err => res.status(400).send(err))
}

