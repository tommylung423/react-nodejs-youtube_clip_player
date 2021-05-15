<<<<<<< HEAD
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
=======
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
const SongListForm = (props) => {
  const [songList, setSongList] = useState("");

  return (
    <Form onSubmit={(e) => props.submitData(e, props.song, songList)}>
>>>>>>> a83ad60a090e58a9f8ed852680bc5625ab544dac
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
<<<<<<< HEAD
      {show && (
        <Alert variant="danger">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{props.errormessage}</p>
        </Alert>
      )}
=======
>>>>>>> a83ad60a090e58a9f8ed852680bc5625ab544dac
    </Form>
  );
};

export default SongListForm;
