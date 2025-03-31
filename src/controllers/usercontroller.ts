import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { AuthRequest } from '../middleware/authMiddleware';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

// Register a new user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {

        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            res.status(400).json({ message: 'Email already in use' });
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
        return
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
        return
    }
};

// Login user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json({ message: 'Could not authenticate' });
            return
        }

        const JWT_SECRET = process.env.JWT_SECRET || "defaultSecret";
        console.log("JWT_SECRET:", JWT_SECRET);

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is missing, check your .env file.");
            res.status(500).json({ message: "Server error" });
            return;
        }

        const token = jwt.sign({ id: user._id, role: user.role}, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
        return
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
        return
    }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
        return
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
        return
    }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params; // The users ID who should be deleted
        const requester = (req as AuthRequest).user; // The user who does the call

        // Check that requester is defined
        if (!requester) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        // Only admin or the user themselves can delete the account.
        if (requester.role !== "admin" && requester.id !== id) {
            res.status(403).json({ message: "Access denied" });
            return;
        }

        // Check that the user exists before deleting
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        await user.deleteOne(); // Delete user

        res.json({ message: 'User deleted successfully' });
        return
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
        return
    }
};

// Update a user (Admin can update any user, users can update themselves)
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params; // Get user ID from URL
        const { username, email, password } = req.body;
        const requester = (req as AuthRequest).user; // Explicitly cast req to AuthRequest to ensure user exists

        // Ensure requester is defined
        if (!requester) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        // Check if the requester is an admin or if the user is updating their own profile
        if (requester.role !== "admin" && requester.id !== id) {
            res.status(403).json({ message: "Access denied" });
            return;
        }

        // Find user by ID
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        //  // Update user details
        if (username) user.username = username;
        if (email) user.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        // Save updated user
        await user.save();

        res.json({ message: "User updated successfully", user });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
        return;
    }
};
