import * as env from "dotenv";
env.config();
import jwt from "jsonwebtoken";
import {
  pushUserInfoToDB,
  updateProperty,
  getProperty,
  getAverage,
} from "../database/generalFuncs.js";
import db from "../database/connection.js";

export const addingRating = (req, res, next) => {
  const { newValue, id } = req.body;
  const token = req.headers.authorization;
  if (token == null) return res.status(401).send("Must send a token");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).send("Token no longer valid");

    //Get userId
    const getUserId = await getProperty("users_recipes", "user_id", {
      user_id: decoded.userId,
      recipe_id: id,
    });

    // Check if user and recipe are existing in DB if not add all the user data to DB
    if (getUserId.length < 1) {
      await pushUserInfoToDB("users_recipes", {
        user_id: decoded.userId,
        rating: newValue,
        recipe_id: id,
      });
      //User and recipe are existing
    } else {
      await updateProperty(
        "users_recipes",
        {
          rating: newValue,
        },
        { user_id: decoded.userId, recipe_id: id }
      );
    }
    res.send();
  });
};

export const getRatingsAvg = async (req, res) => {
  const { id, recipe_id } = req.body;
  const token = req.headers.authorization;
  if (token == null) return res.status(401).send("Must send a token");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).send("Token no longer valid");

    //check if there is rating of a recipe
    let isRating = await getProperty("users_recipes", "rating", {
      recipe_id,
      user_id: decoded.userId,
    });
    //Check if there is rating and user can't rate anymore
    if (isRating.some((rating) => Number(rating.rating))) {
      isRating = true;
      //else rating === 0 and  let him rate
    } else {
      isRating = false;
    }
    // send ratings average to user
    let ratingAvg = await db
      .table("users_recipes")
      .avg("rating")
      .where({ recipe_id })
      .andWhere("rating", "!=", 0);

    res.send({
      ratingAvg: ratingAvg[0].avg,
      rating: isRating,
    });
  });
};

export const addingViews = async (req, res, next) => {
  const { recipe_id } = req.body;
  //get The views property
  const getViews = await getProperty("recipes", "views", { recipe_id });
  // update it
  await updateProperty(
    "recipes",
    { views: getViews[0].views + 1 },
    { recipe_id }
  );
  //send back to server
  const views = await getProperty("recipes", "views", { recipe_id });
  res.send({ views: views[0].views });
};

export const addingComment = (req, res, next) => {
  const token = req.headers.authorization;
  const { title, content, recipe_id } = req.body.values;
  if (token == null) return res.status(401).send("Must send a token");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).send("Token no longer valid");
    await pushUserInfoToDB("users_recipes", {
      user_id: decoded.userId,
      comment_date: new Date().toString(),
      comment_title: title,
      comment_body: content,
      recipe_id,
    });
    res.send();
  });
};
