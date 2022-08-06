import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function DisplayInputGroup({ id, label, type, placeholder, isButton }) {
  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Text>Ingredients</InputGroup.Text>
        <Form.Control aria-label="First name" placeholder="Name" />
        <Form.Control aria-label="Last name" placeholder="Units" />
      </InputGroup>
    </div>
  );
}

export default DisplayInputGroup;
