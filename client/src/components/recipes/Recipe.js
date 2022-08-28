import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../.././css/recipeList.css";
import { setSelectedRecipe } from "../../Redux/features/recipesSlice";
import axios from "axios";
import { recipeViews } from "../../Redux/features/recipesSlice";
const URL = `${process.env.REACT_APP_URL}/feelingEat/recipes/views`;

function Recipe({ recipe }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title, img, recipe_id, author, description } = recipe;
  const token = useSelector((store) => store.registerReducer.token);
  const handleClick = async (e) => {
    dispatch(setSelectedRecipe(recipe));
    localStorage.setItem("recipe_id", recipe_id);
    localStorage.setItem("recipe", JSON.stringify(recipe));
    const recipeId = Number(localStorage.getItem("recipe_id"));
    const data = await axios({
      method: "POST",
      url: URL,
      data: {
        recipe_id: recipeId,
      },
      headers: {
        Authorization: token,
      },
    });
    dispatch(recipeViews(data.data.views));
    navigate(`/chosenRecipe`);
  };

  return (
    <div onClick={handleClick} className="card-container">
      <div className="card u-clearfix">
        <div>
          <div className="card-body">
            <span className="card-author subtle">{author}</span>
            <h2 className="card-title">{title}</h2>
            {/* <p className="card-description subtle">{description}</p> */}
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
