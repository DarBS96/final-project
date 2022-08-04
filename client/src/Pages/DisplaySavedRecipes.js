import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
const URL = `${process.env.REACT_APP_URL}/feelingEat/recipes/savedRecipes`;

function DisplaySavedRecipes(props) {
  const token = useSelector((store) => store.registerReducer.token);
  let { recipe_id } = useParams();
  console.log(recipe_id);
  useEffect(() => {
    const getSavedRecipes = async () => {
      const data = await axios({
        method: "POST",
        url: `${URL}`,
        data: {
          saved: true,
          recipe_id,
        },
        headers: {
          Authorization: token,
        },
      });
      console.log(data);
    };
    getSavedRecipes();
  });
  return <div></div>;
}

export default DisplaySavedRecipes;
