"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recipe_controller_1 = require("../controllers/recipe.controller");
const authMiddleware_1 = require("../middleware/authMiddleware"); // <-- ✅ Importera
const router = (0, express_1.Router)();
router.get("/", recipe_controller_1.getRecipes);
router.get("/:id", recipe_controller_1.getRecipeById);
router.post("/", authMiddleware_1.authenticateUser, recipe_controller_1.createRecipe); // <-- ✅ Skydda POST
router.put("/:id", authMiddleware_1.authenticateUser, recipe_controller_1.updateRecipe); // <-- ✅ Skydda PUT
router.delete("/:id", authMiddleware_1.authenticateUser, recipe_controller_1.deleteRecipe); // <-- ✅ Skydda DELETE
exports.default = router;
