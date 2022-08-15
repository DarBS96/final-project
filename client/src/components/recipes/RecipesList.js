import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipes } from "../../Redux/features/recipesSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Recipe from "./Recipe";
import "../../css/recipeList.css";

function RecipesList(props) {
  const dispatch = useDispatch();
  const { recipes } = useSelector((store) => store.recipesSlice);
  const { feelingName } = useSelector((store) => store.feelingSlice);

  useEffect(() => {
    dispatch(getRecipes());
  }, []);
  return (
    <div className="recipes-container">
      <h1 className="main-title-recipeList">
        Here you can find all of {feelingName} recipes!
      </h1>
      <div className="series-frame">
        <Link className="link-adding-customRecipe" to={`/addCustomRecipe`}>
          Add your own recipe!
        </Link>
      </div>
      <div className="recipes-list-container container">
        {recipes.map((recipe) => {
          return <Recipe recipe={recipe} key={recipe.recipe_id} />;
        })}
      </div>
    </div>
  );
}

export default RecipesList;
