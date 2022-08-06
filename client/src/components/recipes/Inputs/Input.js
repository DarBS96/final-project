import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addRecipe } from "../../../Redux/features/recipesSlice";

function Input({ label, type, id, isButton, placeholder }) {
  // const initialState = {
  //   title: "",
  //   ingredients: [
  //     {
  //       name: "",
  //       amount: 1,
  //       unit: "",
  //     },
  //   ],
  //   preparation: [],
  //   recipeImg: "",
  //   description: "",
  //   author: "",
  // };
  const dispatch = useDispatch();
  // const [values, setValues] = useState(initialState);
  const handleChange = (e) => {
    // const { name, value } = e.target;
    // console.log(name);
    // if (
    //   name === "ingredients" ||
    //   name === "preparation" ||
    //   name === "grams" ||
    //   name === "units"
    // ) {
    //   setValues({
    //     ...values,
    //     // [name]: values[name].concat([value]),
    //     [name]: values[name].push(value),
    //   });
    // } else {
    //   setValues({
    //     ...values,
    //     [name]: value,
    //   });
    // }
    // // dispatch(addRecipe({ customRecipe: values }));
    // console.log(values);
  };

  const handleClick = () => {};

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div>
        <br />
        <input
          // value={values[id]}
          onChange={handleChange}
          type={type}
          id={id}
          name={id}
          placeholder={placeholder}
          required
        />
        {isButton && <button onClick={handleClick}>+</button>}
      </div>
    </div>
  );
}

export default Input;
