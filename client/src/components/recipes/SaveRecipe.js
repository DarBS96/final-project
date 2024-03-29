import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BsFillHeartFill } from "react-icons/bs";
import DisplayModal from "../allToDisplay/DisplayModal";
import { isRecipeSaved } from "../../Redux/features/recipesSlice";
const URL = `${process.env.REACT_APP_URL}/feelingEat/recipes/saveRecipe`;

function SaveRecipe({ recipe_id }) {
  const token = useSelector((store) => store.registerReducer.token);
  const feeling_id = useSelector(
    (store) => store.recipesSlice.selectedRecipe.fk_feeling_id
  );
  const ref = useRef(null);
  const [isSaved, setIsSaved] = useState(false);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
const btnElement = ref.current;
  useEffect(() => {
    // dispatch(setSelectedRecipe());
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
        dispatch(isRecipeSaved(true));
        ref.current.style.color = "red";
      } else {
        dispatch(isRecipeSaved(false));
      }
    };
    recipeIsSaved();
  }, [isSaved, showModal, ref.current]);

  const handleClick = async (e) => {
  btnElement.style.color = "red";
  setIsSaved(true)
  setShowModal(true);
    if (!isSaved) {
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
    }
    //If user won't close it, the modal will disappear after 3 seconds
    setTimeout(() => {
      setShowModal(false);
    }, 3000);
  };
  return (
    <>
      <div onClick={handleClick} ref={ref} className="wrapped-heart">
        <BsFillHeartFill className="heart-save" />
      </div>
      {showModal && <DisplayModal />}
    </>
  );
}

export default SaveRecipe;
