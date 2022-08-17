import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
// import {
//   selectedRecipe,
//   recipeViews,
//   setSelectedRecipeId,
// } from "../../Redux/features/recipesSlice";
import { useSelector, useDispatch } from "react-redux";
import "../.././css/recipeList.css";

function Recipe({ recipe }) {
  const navigate = useNavigate();
  const { title, img, recipe_id, author, description } = recipe;
  const handleClick = async (e) => {
    localStorage.setItem("recipe_id", JSON.stringify(recipe_id));
    localStorage.setItem("recipe", JSON.stringify(recipe));
    navigate(`/chosenRecipe`);
  };

  return (
    <div className="card-container">
      <div className="card u-clearfix">
        <div>
          <div className="card-body">
            <span className="card-author subtle">{author}</span>
            <h2 className="card-title">{title}</h2>
            <p className="card-description subtle">{description}</p>
            <div className="card-read" onClick={handleClick}>
              Read
            </div>
          </div>
        </div>
        <div>
          <img src={img} alt="recipe" className="card-media" />
        </div>
      </div>
      <div className="card-shadow"></div>
    </div>
  );
}

export default Recipe;
