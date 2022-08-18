import express from "express";
const routerRecipes = express.Router();

import {
  addingRating,
  addingViews,
  getRatingsAvg,
  addingComment,
  deleteComment,
  UpdateComment,
} from "../controllers/recipeDetails.js";
import {
  getRecipesFromDB,
  getAllComments,
  displayFilteredRecipesByFeelings,
  saveRecipe,
  addingCustomRecipe,
  getMyComments,
  // getRecipeFromDB,
} from "../controllers/recipes.js";
import { authenticateToken } from "../middleware/auth.js";

routerRecipes.get("/recipes", authenticateToken, getRecipesFromDB);
// routerRecipes.get("/recipe", getRecipeFromDB);
routerRecipes.post("/recipes/rating", authenticateToken, addingRating);
routerRecipes.post("/recipes/rating/average", authenticateToken, getRatingsAvg);
routerRecipes.post("/recipes/views", authenticateToken, addingViews);
routerRecipes.post("/recipes/comment", authenticateToken, addingComment);
routerRecipes.post(
  "/recipes/showAllComments",
  authenticateToken,
  getAllComments
);
routerRecipes.post(
  "/recipes/savedRecipes",
  authenticateToken,
  displayFilteredRecipesByFeelings
);
routerRecipes.post("/recipes/saveRecipe", authenticateToken, saveRecipe);
routerRecipes.post(
  "/recipes/addingCustomRecipe",
  authenticateToken,
  addingCustomRecipe
);
routerRecipes.get("/recipes/myComments", authenticateToken, getMyComments);
routerRecipes.delete(
  "/recipes/deleteComment",
  authenticateToken,
  deleteComment
);
routerRecipes.put("/recipes/updateComment", authenticateToken, UpdateComment);

export default routerRecipes;
