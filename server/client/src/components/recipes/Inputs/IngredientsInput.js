import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { addIngredients } from "../../../Redux/features/recipesSlice";
import { v4 as uuid } from "uuid";
import "../../.././css/input.css";

import InputGroup from "react-bootstrap/InputGroup";
import { BsPlusCircle } from "react-icons/bs";

function IngredientsInput() {
  const initialState = {
    id: uuid(),
    name: "",
    amount: "",
    units: "",
  };
  const [values, setValues] = useState(initialState);
  const [isValid, setIsValid] = useState(true);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((values) => {
      return {
        ...values,
        [name]: value,
      };
    });
  };

  //Reacting kike submit inside form group
  const handleClick = (e) => {
    e.preventDefault();
    if (!values.name || !values.amount) {
      setIsValid(false);
    } else {
      setIsValid(true);
      dispatch(addIngredients({ ingredients: [values] }));
      setValues(initialState);
    }
  };

  return (
    <div className="mb-3 container d-flex">
      <div>
        <InputGroup className={"ingredient-input-group"}>
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

          {!isValid && <p>Sorry you have to fill this up first!</p>}
        </InputGroup>
      </div>
      <div>
        <button className="btn-add-item" onClick={handleClick}>
          <BsPlusCircle className="btn-add-item-icon" />
        </button>
      </div>
    </div>
  );
}

export default IngredientsInput;
