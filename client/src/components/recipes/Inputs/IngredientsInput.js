import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { addIngredients } from "../../../Redux/features/recipesSlice";
import { v4 as uuid } from "uuid";

import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

function IngredientsInput() {
  const id = uuid();
  const initialState = {
    id,
    name: "",
    amount: "",
    units: "",
  };
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(value);
    setValues((values) => {
      return {
        ...values,
        [name]: value,
      };
    });
  };

  const handleClick = () => {
    console.log([values]);
    dispatch(addIngredients({ ingredients: [values] }));
    setValues(initialState);
  };

  return (
    <div>
      <InputGroup className="mb-3 container">
        <InputGroup.Text>Ingredients</InputGroup.Text>
        <Form.Control
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={values.name}
          autoComplete="off"
        />
        <Form.Control
          type="number"
          name="amount"
          placeholder="Amount"
          onChange={handleChange}
          value={values.amount}
          autoComplete="off"
        />
        <Form.Control
          name="units"
          placeholder="Units"
          onChange={handleChange}
          value={values.units}
          autoComplete="off"
        />
        <Button onClick={handleClick}>+</Button>
      </InputGroup>
    </div>
  );
}

export default IngredientsInput;
