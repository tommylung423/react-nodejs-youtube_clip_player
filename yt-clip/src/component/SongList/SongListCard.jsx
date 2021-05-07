import React from "react";
import { Card, Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import Popup from "../common/popup";
import SongListForm from "../common/songListForm";

export default function SongListCard(props) {
  const { song, submitData, errormessage } = props;

  return (
    <div>
      <Card style={{ textAlign: "center", height: "10em" }}>
        <Card.Body>
          <Card.Title style={{ fontSize: "175%" }}>{song.name}</Card.Title>

          <Button
            variant="primary"
            onClick={() => props.onButton(song)}
            style={{ marginTop: "0.5em" }}
          >
            Go somewhere
          </Button>
        </Card.Body>
        <Card.Footer
          className="text-right"
          style={{ background: "#ffffff", border: "none" }}
        >
          <Popup
            name="Change Song List"
            title="Change Song List"
            mode="FileText20"
            pop={SongListForm({ submitData, song, errormessage })}
            show={props.show}
          />

          <Icon.XSquareFill
            onClick={() => props.onDelete(props.song)}
            style={{ fontSize: "20px" }}
          />
        </Card.Footer>
      </Card>
    </div>
  );
}
