//Importing necessary files
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes";
import recipeRoutes from "./routes/reciperoutes";

// Load environment variables from .env file
dotenv.config();

// Create an Express app
const app = express();

// Enable CORS with specific configuration for frontend requests
app.use(cors(
    {
        origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:4200"], // Allow requests from the specified origin (frontend)
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
    }
));

// Parse incoming requests with JSON payloads
app.use(express.json());

// Define the API routes for users and recipes
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);

// Define the port to run the server, default to 5000 if not provided in .env
const PORT = process.env.PORT || 4000;

// Connect to MongoDB using Mongoose
mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {
        console.log("MongoDB connected!");
    })
    .catch((error) => console.error("MongoDB connection error:", error));
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));