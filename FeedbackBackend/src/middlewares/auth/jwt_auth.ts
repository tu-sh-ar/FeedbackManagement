import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../../model/user_model';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  let token: string;

  let authHeader = req.headers.authorization;

  if (authHeader && authHeader.toString().startsWith('Bearer')) {
    token = authHeader.toString().split(' ')[1];

    try {
      const decodedToken = jwt.verify(token, 'secret') as {
        user: {
          email: string;
          id: string;
      }
    };

      console.log(decodedToken)

      if (decodedToken) {
        // Access the token claims
        const email = decodedToken.user.email;
        const id = decodedToken.user.id;
        console.log(email, id )
        // Storing the extracted information for later use or pass it to the next middleware
        req.user = {
          id,
          email,
        };

        next();
      } else {
        res.status(401).send('Invalid Token');
      }
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        res.status(401).send('Token has expired');
      } else {
        res.status(401).send(error);
      }
    }
  } else {
    res.status(401).send('Authorization header missing');
  }
};
