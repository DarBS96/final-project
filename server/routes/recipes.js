import express from "express";
const routerRecipes = express.Router();
import { getRecipeFromDB, getRecipesFromDB } from "../controllers/recipes.js";

import {
  addingRating,
  addingViews,
  getRatingsAvg,
  addingComment,
} from "../controllers/recipeDetails.js";
import {
  getAllComments,
  displayFilteredRecipesByFeelings,
  saveRecipe,
} from "../controllers/recipes.js";
import { authenticateToken } from "../middleware/auth.js";

routerRecipes.get("/recipes", authenticateToken, getRecipesFromDB);
routerRecipes.get("/recipes/:id", authenticateToken, getRecipeFromDB);
routerRecipes.post("/recipes/rating", addingRating);
routerRecipes.post("/recipes/rating/average", getRatingsAvg);
routerRecipes.post("/recipes/views", addingViews);
routerRecipes.post("/recipes/comment", addingComment);
routerRecipes.post("/recipes/showAllComments", getAllComments);
routerRecipes.post("/recipes/savedRecipes", displayFilteredRecipesByFeelings);
routerRecipes.post("/recipes/saveRecipe", saveRecipe);

export default routerRecipes;
