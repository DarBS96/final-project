import { useSelector, useDispatch } from "react-redux";
import AddComment from "../components/recipes/comments/AddComment";
import { useEffect, useState } from "react";
import StarRating from "../components/recipes/Inputs/StarRating";
import DisplayComments from "../components//allToDisplay/DisplayComments";
import SaveRecipes from "../components/recipes/SaveRecipe";
import SaveRecipe from "../components/recipes/SaveRecipe";
function Recipe(props) {
  const { recipes, views, comments } = useSelector(
    (store) => store.recipesSlice
  );
  const { title, preparation, author, date, ingredients, img, recipe_id } =
    recipes[0];
  const { name, amount, units } = ingredients;
  const { number, method } = preparation;
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const wantedSyntaxDate = new Date(date).toLocaleString("en-US", options);
  return (
    <div id={recipe_id} className="recipe-container">
      <h1>{title}</h1>
      <img style={{ width: "200px", height: "200px" }} src={img} alt="fds" />
      <br />
      <StarRating recipe_id={recipe_id} />
      <h2>Views:</h2>
      <p>{views}</p>
      <SaveRecipe recipe_id={recipe_id} />
      <h2>Ingredients</h2>
      {ingredients.map((ingredient, idx) => (
        <p key={idx}>{name + amount + units}</p>
      ))}
      <h2>Method</h2>
      {/* <p>Method{preparation}</p> */}
      <h2>Author</h2>
      <p>{author}</p>
      <h2>Write at:</h2>
      <p>{wantedSyntaxDate}</p>
      <AddComment recipe_id={recipe_id} />
      <DisplayComments />
    </div>
  );
}

export default Recipe;
