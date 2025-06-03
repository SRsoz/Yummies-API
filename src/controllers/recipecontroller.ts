import { Request, Response } from "express";
import { Recipe } from "../models/recipe";
import mongoose from "mongoose";

declare module "express-serve-static-core" {
    interface Request {
        user?: { role: "user"| "admin", id: string};
    }
}

// Get all recipes from the database 
export const getRecipes = async (req: Request, res: Response): Promise<void> => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
        return
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
        return
    }
};

// Get specific recipe by ID
export const getRecipeById = async (req: Request, res: Response): Promise<void> => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        // If recipe is not found, return 404
        if (!recipe) {
            res.status(404).json({ message: "Recipe not found" });
            return
        }
        res.json(recipe);
        return
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
        return
    }
};

// Create new recipe and sace it in the database
export const createRecipe = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, ingredients, instructions } = req.body;
        const userId= req.user?.id || null;
        const newRecipe = new Recipe({ title, ingredients, instructions, userId });
        await newRecipe.save();
        res.status(201).json(newRecipe);
        return
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
        return
    }
};

// Update a existing recipe if the user is authorized
export const updateRecipe = async (req: Request, res: Response): Promise<void> => {
    try {

        // const userId= req.user?.id;
        // const recipe= await Recipe.findById(req.params.id).exec();

        // // Check if recipe exists and if the user is authorized to update it
        // if (!recipe || !userId || recipe!.userId.toString() !== userId) {
        //     res.status(401).json({ message: 'Not authorized to update recipe' });
        //     return
        // }

        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });

        // If the recipe doesn't exist, return 404
        if (!updatedRecipe) {
            res.status(404).json({ message: "Recipe not found" });
            return
        }

        res.json(updatedRecipe);
        return
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
        return
    }
};

// Delete a recipe by its ID
export const deleteRecipe = async (req: Request, res: Response): Promise<void> => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);

        // If the recipe is not found, return 404
        if (!recipe) {
            res.status(404).json({ message: "Recipe not found" });
            return
        }

        res.json({ message: "Recipe deleted successfully" });
        return
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
        return
    }
};
