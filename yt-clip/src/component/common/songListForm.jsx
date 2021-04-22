import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
const SongListForm = (props) => {
  const [songList, setSongList] = useState("");

  return (
    <Form onSubmit={(e) => props.submitData(e, props.song, songList)}>
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
    </Form>
  );
};

export default SongListForm;
