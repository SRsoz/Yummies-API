//Importing necessary files
import { Router } from "express";
import { getRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe } from "../controllers/recipecontroller";
// import { authenticateUser } from "../middleware/authMiddleware";

const router = Router();

//Routes 
router.get("/", getRecipes);
router.get("/:id", getRecipeById);
router.post("/", createRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

export default router;
