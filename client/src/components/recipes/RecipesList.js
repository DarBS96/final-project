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

  useEffect(() => {
    dispatch(getRecipes());
  }, []);
  return (
    <div>
      {/* <Link to={`/addCustomRecipe`}>Add your own recipe!</Link> */}
      {recipes.map((recipe) => {
        return <Recipe recipe={recipe} key={recipe.recipe_id} />;
      })}
    </div>
  );
}

export default RecipesList;
