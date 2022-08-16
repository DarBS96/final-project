import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import Recipe from "../components/recipes/Recipe";
import ".././css/savedRecipes.css";
import Spinner from "react-bootstrap/Spinner";

const URL = `${process.env.REACT_APP_URL}/feelingEat/recipes/savedRecipes`;

function DisplaySavedRecipes(props) {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.registerReducer.token);
  const { feelingName } = useSelector((store) => store.feelingSlice);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [isRecipeToDisplay, setIsRecipeToDisplay] = useState(false);
  const [displaySpinner, setDisplaySpinner] = useState(true);

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
      if (data.status === 200) {
        setDisplaySpinner(false);
      }
      if (data.data.filteredSavedRecipes < 1) {
        setIsRecipeToDisplay(true);
      }
      setSavedRecipes(data.data.filteredSavedRecipes);
    };
    getSavedRecipes();

    return () => {
      setDisplaySpinner(true);
      setIsRecipeToDisplay(false);
    };
  }, [feeling_id]);
  return (
    <div className="container">
      <h1 className="savedRecipes-title">
        {feelingName} recipes that you have saved{" "}
      </h1>
      <div className="savedRecipes-container">
        {savedRecipes.map((recipe, idx) => {
          return <Recipe key={idx} recipe={recipe} />;
        })}
      </div>
      {displaySpinner && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {isRecipeToDisplay && <h1>No saved recipes!</h1>}
    </div>
  );
}

export default DisplaySavedRecipes;
