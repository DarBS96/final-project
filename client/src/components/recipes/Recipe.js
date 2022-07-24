import React from "react";
import { useNavigate } from "react-router-dom";
import { selectedRecipe } from "../../Redux/features/recipesSlice";
import { useSelector, useDispatch } from "react-redux";
import { addingRecipeView } from "../../Redux/features/recipesSlice";

function Recipe({ recipe }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { recipe_title, recipe_img, recipe_id } = recipe;

  const handleClick = () => {
    selectedRecipe(recipe);
    dispatch(addingRecipeView());
    navigate(`/chosenRecipe`);
  };

  return (
    <div id={recipe_id} className="recipe-container">
      <h1>{recipe_title}</h1>
      <img
        style={{ width: "200px", height: "200px" }}
        src={recipe_img}
        alt="fds"
      />
      <br />
      <button onClick={handleClick}>Click to see the full recipe</button>
    </div>
  );
}

export default Recipe;
