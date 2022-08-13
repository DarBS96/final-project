import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import IngredientsInput from "../components/recipes/Inputs/IngredientsInput";
import Input from "../components/recipes/Inputs/Input";
import PreparationInput from "../components/recipes/Inputs/PreparationInput";
import {
  addRecipeFields,
  restartIngredientsAndMethods,
} from "../Redux/features/recipesSlice";
import { useDispatch, useSelector } from "react-redux";
import DisplayAddedItem from "../components/allToDisplay/DisplayAddedItem";
import ".././css/customRecipe.css";
import FileBase64 from "react-file-base64";
import { isRecipeSaved } from "../Redux/features/recipesSlice";
import DisplayModal from "../components/allToDisplay/DisplayModal";
const URL = `${process.env.REACT_APP_URL}/feelingEat/recipes/addingCustomRecipe`;

function AddRecipe(props) {
  const initialState = {
    title: "",
    description: "",
    author: "",
  };
  const { ingredients, preparation } = useSelector(
    (store) => store.recipesSlice.customRecipe
  );
  const [photo, setPhoto] = useState("");
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialState);
  const { customRecipe } = useSelector((store) => store.recipesSlice);
  const token = useSelector((store) => store.registerReducer.token);
  const { selectedFeeling, feelingName } = useSelector(
    (store) => store.feelingSlice
  );
  // const { isSaved } = useSelector((store) => store.recipesSlice);
  const ref = useRef();

  //In order to restart the values
  useEffect(() => {
    if (
      values.title &&
      values.description &&
      values.author &&
      ingredients.length >= 1 &&
      preparation.length >= 1
    ) {
      return () => {
        const btnElement = ref.current;
        btnElement.disabled = false;
      };
    }
  }, [values, ref]);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });

    dispatch(addRecipeFields({ fields: values }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch(isRecipeSaved(false));
    const data = await axios({
      method: "POST",
      url: URL,
      data: {
        customRecipe,
        photo,
        feeling_id: selectedFeeling,
      },
      headers: {
        Authorization: token,
      },
    });
    setValues(initialState);
    dispatch(restartIngredientsAndMethods());
  };

  return (
    <div>
      <h3 className="main-title">Add your own {feelingName} recipe!</h3>
      <div className="customRecipe-container">
        <form
          className="form-container"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <Input
            type={"text"}
            // label={"Title"}
            id={"title"}
            placeholder={"Best Pizza ever!"}
            onChange={handleChange}
            value={values.title}
          />
          <IngredientsInput />
          <DisplayAddedItem ingredients={ingredients} />
          <PreparationInput />
          <DisplayAddedItem preparation={preparation} />
          <Input
            label={
              "Here you can dedicate the recipe, describe how you feel, why you chose this recipe et cetera.."
            }
            id={"description"}
            placeholder={"For my husband that in love with this pizza"}
            onChange={handleChange}
            value={values.description}
          />
          <div className="file-container">
            <p>upload recipe image</p>
            <div className="file">
              <FileBase64
                type="file"
                multiple={false}
                onDone={(file) => {
                  setPhoto(file.base64);
                }}
              />
            </div>
          </div>

          <Input
            type={"text"}
            // label={"Author"}
            id={"author"}
            placeholder={"Made with love by Johanna Cohen"}
            onChange={handleChange}
            value={values.author}
          />
          <br />
          <button
            disabled={true}
            ref={ref}
            className="w-25 m-auto btn-add-recipe"
            type="submit"
          >
            Add recipe!
          </button>
          {/* {!isSaved && <DisplayModal />} */}
        </form>
      </div>
    </div>
  );
}

export default AddRecipe;
