import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
const URL = `${process.env.REACT_APP_URL}/feelingEat/recipes/saveRecipe`;

function SaveRecipe({ recipe_id }) {
  const token = useSelector((store) => store.registerReducer.token);
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
      <button onClick={handleClick}>Save</button>
    </div>
  );
}

export default SaveRecipe;
