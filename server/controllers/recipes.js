import * as env from "dotenv";
env.config();
import jwt from "jsonwebtoken";

import {
  getProperty,
  getAllProperties,
  updateProperty,
  pushUserInfoToDB,
} from "../database/generalFuncs.js";
import db from "../database/connection.js";

export const getRecipesFromDB = async (req, res) => {
  const { id } = req.headers;
  console.log(id);
  const recipes = await getProperty("recipes", "*", { fk_feeling_id: id });
  res.send(recipes);
};
export const getAllComments = (req, res) => {
  const token = req.headers.authorization;
  const { recipe_id } = req.body;
  if (token == null) return res.status(401).send("Must send a token");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).send("Token no longer valid");
    //Display all comments in a ascending order
    const comments = await db
      .table("comments")
      .select("*")
      .orderBy("comment_date", "asc")
      .where({ recipe_id });
    res.send({ comments });
  });
};

export const getMyComments = (req, res) => {
  const token = req.headers.authorization;
  if (token == null) return res.status(401).send("Must send a token");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).send("Token no longer valid");
    const myComments = await getProperty("comments", "*", {
      user_id: decoded.userId,
    });
    res.send(myComments);
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

export const addingCustomRecipe = (req, res, next) => {
  const { title, description, author, ingredients, preparation } =
    req.body.customRecipe;
  const { feeling_id, photo } = req.body;
  const token = req.headers.authorization;
  if (token == null) return res.status(401).send("Must send a token");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).send("Token no longer valid");
    await pushUserInfoToDB("recipes", {
      user_id: decoded.userId,
      title,
      img: photo,
      description,
      author,
      ingredients,
      preparation,
      fk_feeling_id: feeling_id,
      date: new Date().toString(),
    });
    res.send("successfully created");
  });
};
