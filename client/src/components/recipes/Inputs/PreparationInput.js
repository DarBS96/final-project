import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import InputGroup from "react-bootstrap/InputGroup";
import { addPreparation } from "../../../Redux/features/recipesSlice";
import { v4 as uuid } from "uuid";
import { BsPlusCircle } from "react-icons/bs";
import "../../.././css/input.css";

function PreparationInput(props) {
  const id = uuid();
  const initialState = {
    id,
    number: "",
    method: "",
  };
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialState);
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (!values.method) {
      setIsValid(false);
    } else {
      setIsValid(true);
      dispatch(addPreparation({ preparation: [values] }));
      setValues(initialState);
    }
  };

  return (
    <div className="mb-3 container d-flex">
      <div>
        <InputGroup className={"preparation-input-group"}>
          <Form.Control
            placeholder="Preparation"
            onChange={handleChange}
            name="method"
            value={values.method}
            autoComplete="off"
          />
        </InputGroup>
        {!isValid && <p>Sorry you have to fill this up first!</p>}
      </div>
      <div>
        <button className="btn-add-item" onClick={handleClick}>
          <BsPlusCircle className="btn-add-item-icon" />
        </button>
      </div>
    </div>
  );
}

export default PreparationInput;
