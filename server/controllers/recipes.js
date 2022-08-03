import * as env from "dotenv";
env.config();
import jwt from "jsonwebtoken";

import { getProperty } from "../database/generalFuncs.js";

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
    // const isComment = getProperty("users_recipes", "comment_title", {
    //   recipe_id,
    //   user_id: decoded.userId,
    // });
    // console.log(isComment);
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
