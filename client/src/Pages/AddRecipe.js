import React, { useState } from "react";
import axios from "axios";
import IngredientsInput from "../components/recipes/Inputs/IngredientsInput";
import Input from "../components/recipes/Inputs/Input";
import PreparationInput from "../components/recipes/Inputs/PreparationInput";
import { addRecipeFields } from "../Redux/features/recipesSlice";
import { useDispatch, useSelector } from "react-redux";
import DisplayModal from "../components/allToDisplay/DisplayModal";
const URL = `${process.env.REACT_APP_URL}/feelingEat/recipes/addingCustomRecipe`;

function AddRecipe(props) {
  const initialState = {
    title: "",
    recipeImg: "",
    description: "",
    author: "",
  };
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialState);
  const { customRecipe } = useSelector((store) => store.recipesSlice);
  const token = useSelector((store) => store.registerReducer.token);
  const { selectedFeeling, feelingName } = useSelector(
    (store) => store.feelingSlice
  );

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
    const data = await axios({
      method: "POST",
      url: URL,
      data: {
        customRecipe,
        feeling_id: selectedFeeling,
      },
      headers: {
        Authorization: token,
      },
    });
  };

  return (
    <div>
      <h3>Add your {feelingName} own recipe!</h3>
      <form onSubmit={handleSubmit}>
        <Input
          type={"text"}
          label={"Title"}
          id={"title"}
          placeholder={"Best Pizza ever!"}
          onChange={handleChange}
          value={values.title}
        />
        <IngredientsInput />
        <PreparationInput />
        <Input
          label={
            "Here you can dedicate the recipe, describe how you feel, why you chose this recipe et cetera.."
          }
          id={"description"}
          placeholder={"For my husband that in love with this pizza"}
          onChange={handleChange}
          value={values.description}
        />
        {/* //Adding option to upload image from the computer  */}
        <Input
          type={"text"}
          label={"Upload an image"}
          id={"recipeImg"}
          onChange={handleChange}
          value={values.recipeImg}
        />

        <Input
          type={"text"}
          label={"Author"}
          id={"author"}
          placeholder={"Johanna Cohen"}
          onChange={handleChange}
          value={values.author}
        />
        <br />
        <button type="submit">Add recipe!</button>
      </form>
    </div>
  );
}

export default AddRecipe;
