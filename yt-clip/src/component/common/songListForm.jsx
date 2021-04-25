import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const SongListForm = (props) => {
  const [songList, setSongList] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    props.errormessage && props.errormessage.length > 0
      ? setShow(true)
      : setShow(false);
  }, [props.errormessage]);

  return (
    <Form onSubmit={(e) => props.submitData(e, songList, props.song)}>
      <Form.Group controlId="songList">
        <Form.Label>Song List Name</Form.Label>
        <Form.Control
          type="test"
          placeholder="Enter Song List Name"
          onChange={(e) => setSongList(e.target.value)}
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        style={{
          marginLeft: "Auto",
          marginRight: "Auto",
          display: "block",
          width: "90px",
          height: "44px",
        }}
      >
        Submit
      </Button>
      {show && (
        <Alert variant="danger">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{props.errormessage}</p>
        </Alert>
      )}
    </Form>
  );
};

export default SongListForm;
