import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

function Popup(props) {
  var smallIcon = {
    fontSize: 30,
    marginTop: "10px",
    marginBottom: "10px",
  };
  var smallIcon2 = {
    fontSize: 20,
  };
  var bigIcon = {
    display: "block",
    height: "50%",
    width: "50%",
    margin: "auto",
    marginTop: "20px",
  };
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
  }, [props.show]);
  return (
    <React.Fragment>
      {(() => {
        switch (props.mode) {
          case "PlusCircle":
            return (
              <Icon.PlusCircle style={bigIcon} onClick={() => setShow(true)} />
            );
          case "FileText":
            return (
              <Icon.FileText style={smallIcon} onClick={() => setShow(true)} />
            );
          case "FileText20":
            return (
              <Icon.FileText style={smallIcon2} onClick={() => setShow(true)} />
            );
          default:
            return (
              <Button
                variant="primary"
                onClick={() => setShow(true)}
                // style={{ marginTop: "25vh" }}
              >
                {props.name}
              </Button>
            );
        }
      })()}

      <Modal
        animation={false}
        show={show}
        onHide={() => setShow(false)}
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
