import React, { useState } from "react";
import { useSelector } from "react-redux";
import StarRating from "../components/recipes/StarRating";
import Comment from "../components/recipes/Comment";
function Recipe(props) {
  const { recipes, views } = useSelector((store) => store.recipesSlice);
  const {
    recipe_title,
    recipe_body,
    recipe_author,
    recipe_date,
    recipe_ingredients,
    recipe_img,
    recipe_id,
  } = recipes[0];

  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const date = new Date(recipe_date).toLocaleString("en-US", options);

  return (
    <div id={recipe_id} className="recipe-container">
      <h1>{recipe_title}</h1>
      <img
        style={{ width: "200px", height: "200px" }}
        src={recipe_img}
        alt="fds"
      />
      <br />
      <StarRating id={recipe_id} />
      <h2>Views:</h2>
      <p>{views}</p>
      <button>Save</button>
      <h2>Ingredients</h2>
      <p>{recipe_ingredients}</p>
      <h2>Method</h2>
      <p>Method{recipe_body}</p>
      <h2>Author</h2>
      <p>{recipe_author}</p>
      <h2>Write at:</h2>
      <p>{date}</p>
      <Comment />
      <h2>My meals in navbar</h2>
    </div>
  );
}

export default Recipe;
