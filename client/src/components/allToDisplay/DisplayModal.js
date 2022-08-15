import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import { isRecipeSaved } from "../../Redux/features/recipesSlice";

function DisplayModal() {
  const [show, setShow] = useState(true);
  const { isSaved } = useSelector((store) => store.recipesSlice);
  const dispatch = useDispatch();
  const handleClose = () => {
    setShow(false);
  };
  console.log(isSaved);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        {!isSaved ? (
          <Modal.Body style={{ fontSize: "30px" }}>
            Successfully Added!
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
