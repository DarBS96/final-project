import * as env from "dotenv";
env.config();
import jwt from "jsonwebtoken";

import {
  getProperty,
  updateProperty,
  pushUserInfoToDB,
} from "../database/generalFuncs.js";
import db from "../database/connection.js";

export const getRecipesFromDB = async (req, res) => {
  const { id } = req.headers;
  const recipes = await getProperty("recipes", "*", { fk_feeling_id: +id });
  res.send(recipes);
};
export const getRecipeFromDB = async (req, res) => {
  const { id } = req.params;
  const recipes = await getProperty("recipes", "*", { id });
  res.send(recipes);
};

export const getAllComments = (req, res) => {
  const token = req.headers.authorization;
  const { recipe_id } = req.body;
  if (token == null) return res.status(401).send("Must send a token");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).send("Token no longer valid");
    const comments = await getProperty(
      "comments",
      {
        comment_date: "comment_date",
        comment_title: "comment_title",
        comment_body: "comment_body",
        comment_date: "comment_date",
      },
      { recipe_id }
    );
    res.send({ username: decoded.username, comments });
  });
};

export const saveRecipe = (req, res) => {
  const { recipe_id, saved } = req.body;
  const token = req.headers.authorization;
  if (token == null) return res.status(401).send("Must send a token");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).send("Token no longer valid");

    //check if recipe is already saved
    const recipeIsSaved = await getProperty("users_recipes", "saved", {
      user_id: decoded.userId,
      recipe_id,
    });

    // Check if user and recipe are existing in DB if not add all the user data to DB
    if (recipeIsSaved.length < 1) {
      await pushUserInfoToDB("users_recipes", {
        user_id: decoded.userId,
        saved,
        recipe_id,
      });
    } else {
      await updateProperty(
        "users_recipes",
        {
          saved,
        },
        { user_id: decoded.userId, recipe_id }
      );
    }
  });
};

export const displayFilteredRecipesByFeelings = async (req, res) => {
  const { saved, feeling_id, recipe_id } = req.body;
  const token = req.headers.authorization;
  if (token == null) return res.status(401).send("Must send a token");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).send("Token no longer valid");
    //Check what recipes the user saved
    const checkSavedRecipe = await getProperty("users_recipes", "recipe_id", {
      user_id: decoded.userId,
      saved,
    });

    const savedRecipesMappingByNumbers = checkSavedRecipe.map(
      (recipe) => recipe.recipe_id
    );

    const filteredSavedRecipes = await db
      .table("recipes")
      .select("*")
      .whereIn("recipe_id", savedRecipesMappingByNumbers)
      .andWhere({ fk_feeling_id: feeling_id });

    const recipeAlreadySaved = filteredSavedRecipes.some(
      (recipe) => recipe.recipe_id === recipe_id
    );

    res.send({ filteredSavedRecipes, recipeAlreadySaved });
  });
};
