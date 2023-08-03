import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { APP_SECRET } from '../config/index'


export const authentication = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];

    if (token) {
      try {
        const decodedToken = jwt.verify(token, APP_SECRET) as any;
        return decodedToken.userId
      } catch (err) {
        res.status(401).send('Unauthorized, invalid token');
      }
    }
    throw new Error('Authentication token must be \'Bearer [token]\'');
  }
  throw new Error('Authorization header must be provided');
};