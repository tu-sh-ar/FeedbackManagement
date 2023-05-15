import Client from '../model/client_model'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

// create user 
export const clientSignup = async( req:Request, res:Response )  => {
    const user_details = req.body;
    await Client.create(user_details)
    .then(user => res.status(201).send(user))
    .catch(err => res.status(400).send(err))
}

// user login
export const client_login = async(req:Request, res:Response) => {
    const { email, password } = req.body;

    await Client.findOne({email:email,password:password})
    .then(data => {
        if(data){
            
            const token = jwt.sign({
            user:{
                email:data?.email,
                id:data?._id
            }
            },'secret',{expiresIn:"100m"});

            // res.cookie('jwtToken', token, {
            //     httpOnly: true,
            //     maxAge: 100 * 60 * 1000    // Expires in 100 minutes
            //   });
        
                res.status(200).json(token)

            res.status(200).send(token)

        }else{
            res.status(400).send(" Invalid credentials")
        }
        
    })
    .catch(err => res.status(500).send("Internal Server Error"))
}