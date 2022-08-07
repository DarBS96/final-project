import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { addIngredients } from "../../../Redux/features/recipesSlice";

import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

function IngredientsInput({ placeholder }) {
  const initialState = {
    name: "",
    amount: "",
    units: "",
  };
  const [values, setValues] = useState(initialState);
  const [ingredients, setIngredients] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    setIngredients([values]);
  };

  const handleClick = () => {
    console.log(ingredients);
    dispatch(addIngredients({ ingredients }));
    setValues(initialState);
  };

  return (
    <div>
      <InputGroup className="mb-3 container">
        <InputGroup.Text>Ingredients</InputGroup.Text>
        <Form.Control
          // aria-label="First name"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={values.name}
        />
        <Form.Control
          type="number"
          name="amount"
          // aria-label="Last name"
          placeholder="Amount"
          onChange={handleChange}
          value={values.amount}
        />
        <Form.Control
          name="units"
          // aria-label="Last name"
          placeholder="Units"
          onChange={handleChange}
          value={values.units}
        />
        <Button onClick={handleClick}>+</Button>
      </InputGroup>
    </div>
  );
}

export default IngredientsInput;
