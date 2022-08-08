import React, { useEffect, useState } from "react";
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
import FileBase64 from "react-file-base64";
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

  //In order to restart the values
  useEffect(() => {}, [values]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);

    setValues({
      ...values,
      [name]: value,
    });

    console.log(values);
    dispatch(addRecipeFields({ fields: values }));
  };
  // const sendFile = async (e) => {
  //   const formData = new FormData();
  //   formData.append("file", e.target.files);
  //   const data = await axios({
  //     method: "POST",
  //     url: URL,
  //     data: {
  //       formData,
  //     },
  //     headers: {
  //       Authorization: token,
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
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
      <h3>Add your own {feelingName} recipe!</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Input
          type={"text"}
          label={"Title"}
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
        {/* //Adding option to upload image from the computer  */}

        {/* <Input
          type={"file"}
          label={"Upload an image"}
          id={"photo"}
          onChange={sendFile}
          // value={values.photo}
          accept={"image"}
        /> */}
        <FileBase64
          type={"file"}
          multiple={false}
          onDone={(file) => {
            setPhoto(file.base64);
          }}
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
        {/* {isModal && <DisplayModal />} */}
        {/* onClick={() => setIsModal(true)} */}
        <button type="submit">Add recipe!</button>
      </form>
    </div>
  );
}

export default AddRecipe;
