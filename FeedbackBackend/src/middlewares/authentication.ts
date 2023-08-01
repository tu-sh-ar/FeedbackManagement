import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { auth_constant } from '../constants/constants';

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
                businessCategory: string;
            };
            if (decodedToken) {
                // Access the token claims
                const email = decodedToken.email;
                const id = decodedToken.id;
                const role = decodedToken.role;
                const businessCategory = decodedToken.businessCategory;

                let parsedRoleId: number | undefined;
                if (typeof role === 'string') {
                    parsedRoleId = parseInt(role, 10);
                    if (isNaN(parsedRoleId)) {
                        res.status(401).json({ error: 'Unauthorized' });
                    }
                } else if (typeof role !== 'number') {
                    res.status(401).json({ error: 'Unauthorized' });
                }

                // Convert clientId to a number if possible
                let parsedClientId: number | undefined;
                if (typeof id === 'string') {
                    parsedClientId = parseInt(id, 10);
                    if (isNaN(parsedClientId)) {
                        res.status(400).json({ error: 'User Id should be a number or convertible to a number' });
                    }
                } else if (typeof id !== 'number') {
                    res.status(400).json({ error: 'User Id should be a number or convertible to a number' });
                }

                // Storing the extracted information for later use or pass it to the next middleware
                req.user = {
                    id: parsedClientId,
                    email,
                    role: parsedRoleId
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
