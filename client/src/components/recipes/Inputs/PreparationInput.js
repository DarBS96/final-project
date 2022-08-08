import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { addPreparation } from "../../../Redux/features/recipesSlice";
import { v4 as uuid } from "uuid";

function PreparationInput(props) {
  const id = uuid();
  const initialState = {
    id,
    number: "",
    method: "",
  };
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleClick = () => {
    dispatch(addPreparation({ preparation: [values] }));
    setValues(initialState);
  };

  return (
    <div>
      <InputGroup className="mb-3 container">
        <InputGroup.Text>Preparation</InputGroup.Text>
        <Form.Control
          type="number"
          placeholder="Number"
          onChange={handleChange}
          name="number"
          value={values.number}
          autoComplete="off"
        />
        <Form.Control
          placeholder="Method"
          onChange={handleChange}
          name="method"
          value={values.method}
          autoComplete="off"
        />
        <Button onClick={handleClick}>+</Button>
      </InputGroup>
    </div>
  );
}

export default PreparationInput;
