import { Router } from "express";
import { getRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe } from "../controllers/recipecontroller";
import { authenticateUser } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getRecipes);
router.get("/:id", getRecipeById);
router.post("/", authenticateUser, createRecipe);
router.put("/:id", authenticateUser, updateRecipe);
router.delete("/:id", authenticateUser, deleteRecipe);

export default router;
