// import React, { useState } from "react";
// import Input from "./Input";
// import { useDispatch } from "react-redux";
// import { addRecipeFields } from "../../../Redux/features/recipesSlice";

// function FieldsInput(props) {
//   const initialState = {
//     title: "",
//     recipeImg: "",
//     description: "",
//     author: "",
//   };
//   const dispatch = useDispatch();
//   const [values, setValues] = useState(initialState);
//   // const [fields, setFields] = useState([]);
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setValues({
//       ...values,
//       [name]: value,
//     });
//     // dispatch(addRecipeFields({ fields: values }));
//     console.log(values);
//   };

//   return (
//     <div>
//       <Input
//         type={"text"}
//         label={"Title"}
//         id={"title"}
//         placeholder={"Best Pizza ever!"}
//         handleChange={handleChange}
//       />
//       <Input
//         label={
//           "Here you can dedicate the recipe, describe how you feel, why you chose this recipe et cetera.."
//         }
//         id={"description"}
//         placeholder={"For my husband that in love with this pizza"}
//         handleChange={handleChange}
//       />
//       <Input
//         type={"file"}
//         label={"Upload an image"}
//         id={"recipeImg"}
//         handleChange={handleChange}
//       />

//       <Input
//         type={"text"}
//         label={"Author"}
//         id={"author"}
//         placeholder={"Johanna Cohen"}
//         handleChange={handleChange}
//       />
//     </div>
//   );
// }

// export default FieldsInput;
