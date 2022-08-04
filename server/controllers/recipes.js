import * as env from "dotenv";
env.config();
import jwt from "jsonwebtoken";

import { getProperty, updateProperty } from "../database/generalFuncs.js";

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
      "users_recipes",
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
    await updateProperty(
      "users_recipes",
      { saved },
      { recipe_id, user_id: decoded.userId }
    );
  });
};

export const displaySavedRecipes = async (req, res) => {
  const { saved, recipe_id } = req.body;
  const token = req.headers.authorization;
  if (token == null) return res.status(401).send("Must send a token");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).send("Token no longer valid");
    const savedRecipe = await getProperty("users_recipes", "*", {
      recipe_id,
      user_id: decoded.userId,
      saved,
    });
    res.send(savedRecipe[0]);
  });
};
