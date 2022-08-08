import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import {
//   filteredIngredients,
//   filteredMethods,
// } from "../../Redux/features/recipesSlice";
// import { useDispatch } from "react-redux";

function DisplayModal() {
  const [show, setShow] = useState(true);
  // const dispatch = useDispatch();
  const handleClose = () => {
    setShow(false);
    // dispatch(saveChanges(false));
  };
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to add this recipe?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DisplayModal;
