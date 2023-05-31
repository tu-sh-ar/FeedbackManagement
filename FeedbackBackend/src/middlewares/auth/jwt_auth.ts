import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  let token: string;

  let authHeader = req.headers.authorization;

  if (authHeader && authHeader.toString().startsWith('Bearer')) {
    token = authHeader.toString().split(' ')[1];

    try {
      const decodedToken = jwt.verify(token, 'my-32-character-ultra-secure-and-ultra-long-secret') as {
        [key: string]: string;
      };

      if (decodedToken) {
        // Access the token claims
        const nameIdentifier = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        // Storing the extracted information for later use or pass it to the next middleware
        req.user = {
          nameIdentifier,
          role,
        };

        console.log(req.user);

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
