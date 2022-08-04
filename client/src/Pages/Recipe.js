import { useSelector, useDispatch } from "react-redux";
import StarRating from "../components/recipes/StarRating";
import AddComment from "../components/recipes/comments/AddComment";
import { useEffect, useState } from "react";
import DisplayComments from "../components//allToDisplay/DisplayComments";
import SaveRecipes from "../components/recipes/SaveRecipe";
import SaveRecipe from "../components/recipes/SaveRecipe";
function Recipe(props) {
  const { recipes, views, comments } = useSelector(
    (store) => store.recipesSlice
  );
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
      <StarRating recipe_id={recipe_id} />
      <h2>Views:</h2>
      <p>{views}</p>
      <SaveRecipe recipe_id={recipe_id} />
      <h2>Ingredients</h2>
      <p>{recipe_ingredients}</p>
      <h2>Method</h2>
      <p>Method{recipe_body}</p>
      <h2>Author</h2>
      <p>{recipe_author}</p>
      <h2>Write at:</h2>
      <p>{date}</p>
      <DisplayComments />
      <AddComment recipe_id={recipe_id} />
    </div>
  );
}

export default Recipe;
