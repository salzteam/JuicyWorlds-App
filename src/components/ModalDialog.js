import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import withNavigate from "../helpers/withNavigate";

function ModalDialog({ title, body, tos }) {
  const [isShow, invokeModal] = React.useState(true);
  const initModal = () => {
    return invokeModal(false);
  };
  return (
    <>
      <Modal show={isShow}>
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={initModal}>
            Close
          </Button>
          <Link to={tos}>
            <Button variant="dark">Next</Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default withNavigate(ModalDialog);
