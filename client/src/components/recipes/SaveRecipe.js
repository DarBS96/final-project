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
    (store) => store.recipesSlice.selectedRecipe.fk_feeling_id
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
        dispatch(isRecipeSaved(true));
      } else {
        setIsSaved(false);
        dispatch(isRecipeSaved(false));
      }
    };
    recipeIsSaved();

    const btnElement = ref.current;
    if (isSaved)
      return () => {
        btnElement.removeEventListener("click", handleClick);
      };
  }, [showModal]);

  const handleClick = async (e) => {
    setShowModal(true);
    console.log(isSaved);
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
    <div>
      <div onClick={handleClick} ref={ref} className="wrapped-heart">
        <BsHeart className="heart-save" />
      </div>
      {showModal && <DisplayModal />}
    </div>
  );
}

export default SaveRecipe;
