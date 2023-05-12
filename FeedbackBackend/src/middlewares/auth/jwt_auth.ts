import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  let token: string;

  let authHeader = req.headers.authorization;

  if (authHeader && authHeader.toString().startsWith('Bearer')) {
    token = authHeader.toString().split(' ')[1];

    try {
      const decoded = jwt.verify(token, 'secret');

      if (decoded) {
        const data = JSON.parse(JSON.stringify(decoded));
        req.user = data.user;
        next();
      } else {
        res.status(401).send('Invalid Token');
      }
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        res.status(401).send('Token has expired');
      } else {
        res.status(401).send('Invalid Token');
      }
    }
  } else {
    res.status(401).send('Authorization header missing');
  }
};
