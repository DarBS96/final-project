import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
// import {
//   filteredIngredients,
//   filteredMethods,
// } from "../../Redux/features/recipesSlice";
// import { useDispatch } from "react-redux";

function DisplayModal() {
  const [show, setShow] = useState(true);
  const { isSaved } = useSelector((store) => store.recipesSlice);
  console.log(isSaved);
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
        <Modal.Header closeButton></Modal.Header>
        {!isSaved ? (
          <Modal.Body style={{ fontSize: "30px" }}>
            Successfully saved!
          </Modal.Body>
        ) : (
          <Modal.Body style={{ fontSize: "30px" }}>
            Already saved! {<br />}you can watch it in your favorites
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DisplayModal;
