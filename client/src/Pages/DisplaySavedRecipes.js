import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import Recipe from "../components/recipes/Recipe";
const URL = `${process.env.REACT_APP_URL}/feelingEat/recipes/savedRecipes`;

function DisplaySavedRecipes(props) {
  const token = useSelector((store) => store.registerReducer.token);

  const [savedRecipes, setSavedRecipes] = useState([]);
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
      setSavedRecipes(data.data.filteredSavedRecipes);
    };
    getSavedRecipes();
  }, [feeling_id]);
  return (
    <div>
      <div>
        {savedRecipes.map((recipe, idx) => {
          return <Recipe key={idx} recipe={recipe} />;
        })}
      </div>
    </div>
  );
}

export default DisplaySavedRecipes;
