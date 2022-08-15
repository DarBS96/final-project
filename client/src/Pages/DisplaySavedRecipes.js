import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import Recipe from "../components/recipes/Recipe";
import ".././css/savedRecipes.css";
const URL = `${process.env.REACT_APP_URL}/feelingEat/recipes/savedRecipes`;

function DisplaySavedRecipes(props) {
  const token = useSelector((store) => store.registerReducer.token);
  const { feelingName } = useSelector((store) => store.feelingSlice);
  const dispatch = useDispatch();
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [isRecipeToDisplay, setIsResipeToDisplay] = useState(false);
  let { feeling_id } = useParams();
  useEffect(() => {
    const getSavedRecipes = async () => {
      const data = await axios({
        method: "POST",
        url: `${URL}`,
        data: {
          saved: true,
          feeling_id,
        },
        headers: {
          Authorization: token,
        },
      });
      if (data.data.filteredSavedRecipes < 1) setIsResipeToDisplay(true);
      setSavedRecipes(data.data.filteredSavedRecipes);
    };
    getSavedRecipes();
  }, [feeling_id]);
  return (
    <div>
      <h1 className="savedRecipes-title">
        {feelingName} recipes that you have saved{" "}
      </h1>
      <div className="savedRecipes-container">
        {savedRecipes.map((recipe, idx) => {
          return <Recipe key={idx} recipe={recipe} />;
        })}
      </div>
      {isRecipeToDisplay && <h1>No saved recipes!</h1>}
    </div>
  );
}

export default DisplaySavedRecipes;
