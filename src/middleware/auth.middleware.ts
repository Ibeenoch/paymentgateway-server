import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express'

export const protect = ( req: Request, res: Response, next: NextFunction ) => {
    let token;
    try {
        const headerToken = req.headers.authorization?.split(' ')[1];
        // token = jwt.verify(headerToken, `${process.env.JWT_SECRET}`)
    } catch (error) {
        
    }
}