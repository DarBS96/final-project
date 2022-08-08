import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { selectedRecipe, recipeViews } from "../../Redux/features/recipesSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
const URL = `${process.env.REACT_APP_URL}/feelingEat/recipes/views`;

function Recipe({ recipe }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title, img, recipe_id } = recipe;
  // let views = useSelector((store) => store.recipesSlice.views);
  const handleClick = async () => {
    selectedRecipe(recipe);
    const data = await axios({
      method: "POST",
      url: URL,
      data: {
        recipe_id,
      },
    });
    dispatch(recipeViews(data.data.views));
    navigate(`/chosenRecipe`);
  };

  return (
    <div id={recipe_id} className="recipe-container">
      <h1>{title}</h1>
      <img style={{ width: "200px", height: "200px" }} src={img} alt="fds" />
      <br />
      <button onClick={handleClick}>Click to see the full recipe</button>
    </div>
  );
}

export default Recipe;
