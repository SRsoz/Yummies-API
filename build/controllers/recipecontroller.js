"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecipe = exports.updateRecipe = exports.createRecipe = exports.getRecipeById = exports.getRecipes = void 0;
const recipe_1 = require("../models/recipe");
const getRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield recipe_1.Recipe.find().populate("author", "username email");
        res.json(recipes);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getRecipes = getRecipes;
const getRecipeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipe = yield recipe_1.Recipe.findById(req.params.id).populate("author", "username email");
        if (!recipe)
            return res.status(404).json({ message: "Recipe could not be found" });
        res.json(recipe);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getRecipeById = getRecipeById;
const createRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, ingredients, instructions, image, author } = req.body;
        const newRecipe = new recipe_1.Recipe({ title, ingredients, instructions, image, author });
        yield newRecipe.save();
        res.status(201).json(newRecipe);
    }
    catch (error) {
        res.status(500).json({ message: "Could not create recipe", error });
    }
});
exports.createRecipe = createRecipe;
const updateRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedRecipe = yield recipe_1.Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRecipe)
            return res.status(404).json({ message: "Recipe could not be found" });
        res.json(updatedRecipe);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update recipe", error });
    }
});
exports.updateRecipe = updateRecipe;
const deleteRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedRecipe = yield recipe_1.Recipe.findByIdAndDelete(req.params.id);
        if (!deletedRecipe)
            return res.status(404).json({ message: "Recipe could not be found" });
        res.json({ message: "Recipe deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete recipe", error });
    }
});
exports.deleteRecipe = deleteRecipe;
