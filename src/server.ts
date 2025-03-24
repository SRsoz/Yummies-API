import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes";
import recipeRoutes from "./routes/reciperoutes";

dotenv.config();

const app = express();

app.use(cors(
    {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);

const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {
        console.log("MongoDB connected!");
    })
    .catch((error) => console.error("MongoDB connection error:", error));
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));