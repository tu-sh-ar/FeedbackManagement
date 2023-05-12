// adding jwt verification for user and client 
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export const verifytoken = async(req:Request, res:Response, next:NextFunction) => {
    let token:string;
    console.log(req.headers)
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if(authHeader && authHeader.toString().startsWith('Bearer')) {
        // in the authorisation section the index 0 will contain the bearer and the index 1 contain the accesstoken generated on user login 

        token = authHeader.toString().split(" ")[1];            // converting the array to string 

        const decoded = jwt.verify(token, 'secret');  // verifying the generated token using verify

        if(decoded) {
            // parsing the data 
            const data = JSON.parse(JSON.stringify(decoded));
            req.user = data.user;
            next();
        }
        else{
            res.status(401).send("Invalid Token")
        }
        
    }
}
