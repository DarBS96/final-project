import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { selectedRecipe, recipeViews } from "../../Redux/features/recipesSlice";
import { useSelector, useDispatch } from "react-redux";
import StarRating from "./Inputs/StarRating";
import axios from "axios";
import "../.././css/recipeList.css";
const URL = `${process.env.REACT_APP_URL}/feelingEat/recipes/views`;

function Recipe({ recipe }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title, img, recipe_id, author, description } = recipe;
  // let views = useSelector((store) => store.recipesSlice.views);
  const handleClick = async () => {
    dispatch(selectedRecipe(recipe));
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
    <div className="card-container">
      <div className="card u-clearfix">
        <div>
          <div className="card-body">
            <span className="card-author subtle">{author}</span>
            {/* <StarRating readOnly={true} /> */}
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
