import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import IngredientsInput from "../components/recipes/Inputs/IngredientsInput";
import Input from "../components/recipes/Inputs/Input";
import PreparationInput from "../components/recipes/Inputs/PreparationInput";
import {
  addRecipeFields,
  restartIngredientsAndMethods,
  isRecipeSaved,
} from "../Redux/features/recipesSlice";
import { useDispatch, useSelector } from "react-redux";
import DisplayAddedItem from "../components/allToDisplay/DisplayAddedItem";
import ".././css/customRecipe.css";
import FileBase64 from "react-file-base64";
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
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialState);
  const { customRecipe } = useSelector((store) => store.recipesSlice);
  const token = useSelector((store) => store.registerReducer.token);
  const { selectedFeeling, feelingName } = useSelector(
    (store) => store.feelingSlice
  );
  // const { isSaved } = useSelector((store) => store.recipesSlice);
  const ref = useRef();
  useEffect(() => {
    const btnElement = ref.current;
    if (
      values.title &&
      values.description &&
      values.author &&
      ingredients.length >= 1 &&
      preparation.length >= 1 &&
      photo
    ) {
        btnElement.disabled = false;
    } else {
      btnElement.disabled = true;

    }
  }, [values, photo, showModal ]);
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
    setShowModal(true);
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
    dispatch(isRecipeSaved(false));
    setTimeout(() => {
      setShowModal(false);
    }, 3000);
  };

  return (
    <div>
      <h3 className="main-title">Add your own {feelingName} recipe!</h3>
      <div className="customRecipe-container">
        <form
          className="form-container "
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <Input
            type={"text"}
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
            placeholder={"For my fav girl"}
            onChange={handleChange}
            value={values.description}
          />

          <Input
            type={"text"}
            id={"author"}
            placeholder={"Made with love by Dana Cohen"}
            onChange={handleChange}
            value={values.author}
          />
          <div className="file-container">
            <p className="p-customRecipe">upload recipe image</p>
            <div className="file">
              <FileBase64
                type="file"
                name="photo"
                multiple={false}
                onDone={(file) => {
                  setPhoto(file.base64);
                }}
              />
            </div>
          </div>
          <button
            disabled={true}
            ref={ref}
            className="m-auto btn-add-recipe"
            type="submit"
          >
            Add recipe!
          </button>
          {showModal && <DisplayModal />}
        </form>
      </div>
    </div>
  );
}

export default AddRecipe;
