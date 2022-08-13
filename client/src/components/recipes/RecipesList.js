import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { getRecipes } from "../../Redux/features/recipesSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Recipe from "./Recipe";

function RecipesList(props) {
  const dispatch = useDispatch();
  const { recipes } = useSelector((store) => store.recipesSlice);
  const { feelingName } = useSelector((store) => store.feelingSlice);
  console.log(feelingName);

  useEffect(() => {
    dispatch(getRecipes());
  }, []);
  return (
    <div className="recipes-container">
      <h1 className="main-title">
        Here you can find all of {feelingName} recipes!
      </h1>
      <div className="series-frame">
        <Link className="link-adding-customRecipe" to={`/addCustomRecipe`}>
          Add your own recipe!
        </Link>
        <p id="info"></p>
      </div>

      {recipes.map((recipe) => {
        return <Recipe recipe={recipe} key={recipe.recipe_id} />;
      })}
    </div>
  );
}

export default RecipesList;
