import express from "express";
const routerRecipes = express.Router();

import {
  addingRating,
  addingViews,
  getRatingsAvg,
  addingComment,
  deleteComment,
} from "../controllers/recipeDetails.js";
import {
  getRecipesFromDB,
  // getRecipeFromDB,
  getAllComments,
  displayFilteredRecipesByFeelings,
  saveRecipe,
  addingCustomRecipe,
  getMyComments,
} from "../controllers/recipes.js";
import { authenticateToken } from "../middleware/auth.js";

routerRecipes.get("/recipes", authenticateToken, getRecipesFromDB);
// routerRecipes.get("/recipes/:id", authenticateToken, getRecipeFromDB);
routerRecipes.post("/recipes/rating", addingRating);
routerRecipes.post("/recipes/rating/average", getRatingsAvg);
routerRecipes.post("/recipes/views", addingViews);
routerRecipes.post("/recipes/comment", addingComment);
routerRecipes.post("/recipes/showAllComments", getAllComments);
routerRecipes.post("/recipes/savedRecipes", displayFilteredRecipesByFeelings);
routerRecipes.post("/recipes/saveRecipe", saveRecipe);
routerRecipes.post("/recipes/addingCustomRecipe", addingCustomRecipe);
routerRecipes.get("/recipes/myComments", getMyComments);
routerRecipes.post("/recipes/deleteComment", deleteComment);

export default routerRecipes;
