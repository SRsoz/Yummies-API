import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define AuthUser interface to ensure JWT payload contains id and role
export interface AuthUser {
    id: string;
    role: string;
}

// Extend Request to include user with proper type
 export interface AuthRequest extends Request {
    user?: any;
}

// Middleware to authenticate users using JWT
export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.header("Authorization")?.split(" ")[1];

    // If no token is provided, return 401 (Unauthorized)
    if (!token) {
        res.status(401).json({ message: "Authorization denied" });
        return;
    }

    try {
        // Verify and decode the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as AuthUser;
        req.user = decoded;

        next();
    } catch (error) {
        // If token is invalid or expired, return 401
        res.status(401).json({ message: "Expired access" });
        return;
    }
};

// Middleware to authorize admin users
export const authorizeAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
    
    // Check if the user exists and if their role is "admin"
    if (!req.user || req.user.role !== "admin") {
        res.status(403).json({ message: "Access denied, admin permission needed" });
        return;
    }
    next();
};

