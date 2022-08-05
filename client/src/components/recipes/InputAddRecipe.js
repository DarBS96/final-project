import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addRecipe } from "../../Redux/features/recipesSlice";

function InputAddRecipe({ label, type, id, isButton, placeholder }) {
  const initialState = {
    title: "",
    ingredients: [],
    grams: [],
    units: [],
    preparation: [],
    recipeImg: "",
    description: "",
    author: "",
  };
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    if (
      name === "ingredients" ||
      name === "preparation" ||
      name === "grams" ||
      name === "units"
    ) {
      setValues({
        ...values,
        [name]: values[name].push(value),
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
    // dispatch(addRecipe({ customRecipe: values }));
    console.log(values);
  };

  const handleClick = () => {};

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div>
        <br />
        <input
          value={values[id]}
          onChange={handleChange}
          type={type}
          id={id}
          name={id}
          placeholder={placeholder}
          required
        />
        <br />
        {isButton && <button onClick={handleClick}>Add!</button>}
      </div>
    </div>
  );
}

export default InputAddRecipe;
