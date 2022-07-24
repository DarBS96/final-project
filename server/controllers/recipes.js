import * as env from "dotenv";
env.config();

import { getProperty } from "../database/generalFuncs.js";

export const getRecipesFromDB = async (req, res) => {
  const { id } = req.headers;
  console.log(id);
  const recipes = await getProperty("recipes", "*", { fk_feeling_id: +id });
  res.send(recipes);
};
export const getRecipeFromDB = async (req, res) => {
  const { id } = req.params;
  const recipes = await getProperty("recipes", "*", { id });
  res.send(recipes);
};

export const addingRating = (req, res) => {
  res.send("hello");
};
