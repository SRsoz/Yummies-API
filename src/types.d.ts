// Import Request type from Express
import { Request } from "express";

// Extend the Request interface to include a user object with id and role
export interface AuthRequest extends Request {
    user?: { id: string; role: string }; // Optionally add a user object with id and role
}
