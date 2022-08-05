import React from "react";
import InputAddRecipe from "../components/recipes/InputAddRecipe";
import axios from "axios";
const feeling = "romantic";

function AddRecipe(props) {
  const handleSubmit = async (e) => {
    // e.preventDefault();
    // const data = await axios({
    //   method: "POST",
    //   url: URL,
    //   data: {
    //     values,
    //   },
    //   headers: {
    //     Authorization: token,
    //   },
    // })
  };
  return (
    <div>
      <h3>Add your {feeling} own recipe!</h3>
      <form>
        <InputAddRecipe
          type={"text"}
          label={"Title"}
          id={"title"}
          placeholder={"Best Pizza ever!"}
        />
        <InputAddRecipe
          type={"text"}
          label={"Ingredients"}
          id={"ingredients"}
          placeholder={"flour"}
        />
        <InputAddRecipe
          type={"number"}
          label={"Amount"}
          id={"grams"}
          placeholder={"100 grams"}
        />
        <InputAddRecipe
          type={"number"}
          id={"units"}
          placeholder={"units"}
          isButton={true}
        />

        <InputAddRecipe
          type={"text"}
          label={"Preparation"}
          id={"preparation"}
          placeholder={"mix the flour with water and eggs"}
          isButton={true}
        />
        <InputAddRecipe
          type={"text"}
          label={"Upload an image"}
          id={"recipeImg"}
        />
        <InputAddRecipe
          type={"text"}
          label={
            "Here you can dedicate the recipe, describe how you feel, why you chose this recipe et cetera.."
          }
          id={"description"}
          placeholder={"For my husband that in love with this pizza"}
        />
        <InputAddRecipe
          type={"text"}
          label={"Author"}
          id={"author"}
          placeholder={"Johanna Cohen"}
        />
        <button type="submit">Add recipe!</button>
      </form>
      {/* <form onSubmit={handleSubmit}>
        <h3>Add your {feeling} own recipe!</h3>
        <label htmlFor="title">Title</label>
        <br />
        <input onChange={handleChange} type="text" id="title" name="title" />
        <br />
        <label htmlFor="ingredients">Ingredients</label>
        <br />
        <input onChange={handleChange} type="text" id="ingredients" name="ingredients" />
        <br />
        <label htmlFor="preparation">Preparation</label>
        <br />
        <input onChange={handleChange} type="text" id="preparation" name="preparation" />
        <br />
        <label htmlFor="recipeImg">Upload an image</label>
        <br />
        <input onChange={handleChange} type="text" id="recipeImg" name="recipeImg" />
        <label htmlFor="description">
          Here you can dedicate the recipe, describe how you feel, why you chose
          this recipe et cetera..
        </label>
        <br />
        <input onChange={handleChange} type="text" id="description" name="description" />
        <br />
        <label htmlFor="author">Write by</label>
        <br />
        <input onChange={handleChange} type="text" id="author" name="author" />
      </form> */}
    </div>
  );
}

export default AddRecipe;
