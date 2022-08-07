import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";

function Input({ label, type, id, placeholder, onChange }) {
  return (
    <div>
      <Form.Group className="mb-3 container">
        <Form.Label>{label}</Form.Label>
        <Form.Control
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          name={id}
          required
          id={id}
        />
      </Form.Group>
    </div>
  );
}

export default Input;
