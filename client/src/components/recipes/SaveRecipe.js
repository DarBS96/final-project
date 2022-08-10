import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BsHeart } from "react-icons/bs";
import DisplayModal from "../allToDisplay/DisplayModal";
import { isRecipeSaved } from "../../Redux/features/recipesSlice";
const URL = `${process.env.REACT_APP_URL}/feelingEat/recipes/saveRecipe`;

function SaveRecipe({ recipe_id }) {
  const token = useSelector((store) => store.registerReducer.token);
  const feeling_id = useSelector(
    (store) => store.recipesSlice.recipes[0].fk_feeling_id
  );
  const ref = useRef(null);
  const [isSaved, setIsSaved] = useState(false);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

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

      if (data.data.recipeAlreadySaved) {
        setIsSaved(true);
        //update the satate so the Modal will display appropriate response
        dispatch(isRecipeSaved(true));
      }
    };
    recipeIsSaved(showModal);

    const btnElement = ref.current;
    if (isSaved)
      return () => {
        btnElement.current.removeEventListener("click", handleClick);
      };
  }, []);

  const handleClick = async (e) => {
    setShowModal(true);

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
      <div onClick={handleClick} ref={ref} className="wrapped-heart">
        <BsHeart className="heart-save" />
      </div>
      {showModal && <DisplayModal />}
    </div>
  );
}

export default SaveRecipe;
