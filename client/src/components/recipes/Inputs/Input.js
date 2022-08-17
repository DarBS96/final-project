import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "../../.././css/input.css";

function Input({ label, type, id, placeholder, onChange, accept, value }) {
  return (
    <div>
      <Form.Group className="mb-3 container">
        <Form.Label className="p-customRecipe">{label}</Form.Label>
        <Form.Control
          className="single-input"
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          name={id}
          id={id}
          autoComplete="off"
          accept={accept}
          value={value}
        />
      </Form.Group>
    </div>
  );
}

export default Input;
