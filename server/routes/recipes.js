import express from "express";
const routerRecipes = express.Router();
import {
  getRecipeFromDB,
  getRecipesFromDB,
  addingRating,
} from "../controllers/recipes.js";
import { authenticateToken } from "../middleware/auth.js";

routerRecipes.get("/recipes", authenticateToken, getRecipesFromDB);

routerRecipes.get("/recipes/:id", authenticateToken, getRecipeFromDB);

routerRecipes.post("/recipes/:id", addingRating);

export default routerRecipes;
