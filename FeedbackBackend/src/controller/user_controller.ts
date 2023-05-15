import User from '../model/user_model'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

// create user 
export const userSignup = async( req:Request, res:Response )  => {
    const user_details = req.body;
    await User.create(user_details)
    .then(user => res.status(201).send(user))
    .catch(err => res.status(400).send(err))
}

// user login
export const user_login = async(req:Request, res:Response) => {
    const { email, password } = req.body;
    await User.findOne({email:email})
    .then(data => {
        const token = jwt.sign({
            user:{
                email:data?.email,
                id:data?._id
            }
        },'secret',{expiresIn:"100m"});

        // Set the JWT token as a cookie in the response
        // res.cookie('jwtToken', token, {
        //     httpOnly: true,
        //     maxAge: 100 * 60 * 1000    // Expires in 100 minutes
        //   });

        //     res.status(200).json(token)

    })
    .catch(err => res.status(404).send("no user found"))
}


// get user with id 
export const getUser = async(req:Request, res:Response) => {

    const user_id = req.params.id

    await User.findById(user_id)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(404).send(err))
}
