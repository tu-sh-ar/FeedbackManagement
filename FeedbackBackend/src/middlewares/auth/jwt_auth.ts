import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { auth_constant } from '../../constants/constants';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  let token: string;
  let authHeader = req.headers.authorization;
  if (authHeader && authHeader.toString().startsWith('Bearer')) {
    token = authHeader.toString().split(' ')[1];

    try {
      const decodedToken = jwt.verify(token, auth_constant.secret) as {
          email: string;
          id: string;
          role: string;
          businessCategory:string;
    };
      if (decodedToken) {
        // Access the token claims
        const email = decodedToken.email;
        const id = decodedToken.id;
        const role = decodedToken.role;
        const businessCategory = decodedToken.businessCategory;
        // Storing the extracted information for later use or pass it to the next middleware
        req.user = {
          id,
          email,
          role,
          businessCategory
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
