import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
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

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
        return
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
        return
    }
};

// Get all users (admin only)
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
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return
        }

        res.json({ message: 'User deleted successfully' });
        return
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
        return
    }
};
