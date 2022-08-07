import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { addPreparation } from "../../../Redux/features/recipesSlice";
function PreparationInput(props) {
  const initialState = {
    number: "",
    method: "",
  };
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialState);
  const [preparation, setIngredients] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    setIngredients([values]);
  };

  const handleClick = () => {
    console.log(preparation);
    dispatch(addPreparation({ preparation }));
    setValues(initialState);
  };

  return (
    <div>
      <InputGroup className="mb-3 container">
        <InputGroup.Text>Preparation</InputGroup.Text>
        <Form.Control
          type="number"
          // aria-label="Last name"
          placeholder="Number"
          onChange={handleChange}
          name="number"
          value={values.number}
        />
        <Form.Control
          // aria-label="Last name"
          placeholder="Method"
          onChange={handleChange}
          name="method"
          value={values.method}
        />
        <Button onClick={handleClick}>+</Button>
      </InputGroup>
    </div>
  );
}

export default PreparationInput;
