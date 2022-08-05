import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
const URL = `${process.env.REACT_APP_URL}/feelingEat/recipes/saveRecipe`;

function SaveRecipe({ recipe_id }) {
  const token = useSelector((store) => store.registerReducer.token);
  const feeling_id = useSelector(
    (store) => store.recipesSlice.recipes[0].fk_feeling_id
  );
  const ref = useRef(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const recipeIsSaved = async () => {
      const data = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_URL}/feelingEat/recipes/savedRecipes`,
        data: {
          recipe_id,
          saved: true,
          feeling_id,
        },
        headers: {
          Authorization: token,
        },
      });

      if (data.data.recipeAlreadySaved) setIsSaved(true);
    };
    recipeIsSaved();

    const btnElement = ref.current;
    if (isSaved)
      return () => {
        btnElement.current.removeEventListener("click", handleClick);
      };
  }, []);

  const handleClick = async (e) => {
    const data = await axios({
      method: "POST",
      url: `${URL}`,
      data: {
        recipe_id,
        saved: true,
      },
      headers: {
        Authorization: token,
      },
    });
  };
  return (
    <div>
      <div>
        <button ref={ref} onClick={handleClick}>
          Save
        </button>
      </div>
    </div>
  );
}

export default SaveRecipe;
