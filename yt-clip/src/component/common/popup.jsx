import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

function Popup(props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);
  return (
    <React.Fragment>
      <Modal
        animation={false}
        show={show}
        onHide={() => props.onHide()}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{show && props.pop}</Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

export default Popup;
