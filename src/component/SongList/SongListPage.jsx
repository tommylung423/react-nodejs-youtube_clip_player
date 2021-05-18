import React, { useState } from "react";
import { songService } from "../../_services";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userActions } from "../../_actions";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import Popup from "./../common/popup";
import SongListForm from "./../common/songListForm";
import SongListCard from "./SongListCard";
export default function SongListPage(props) {
  const songlists = useSelector((state) => state.songlists.items);
  const uid = useSelector((state) => state.authentication.user._id);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [errormessage, setErrormessage] = useState("");

  function goSong(songlist) {
    console.log(songlist);
    props.history.push(`/songlistpage/${songlist._id}`);
  }

  function handleDelete(songlist) {
    if (window.confirm("Are you sure to delete this songlist?")) {
      songService
        .delSongLists(songlist._id)
        .then(() => {
          dispatch(userActions.getSongLists(uid));
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }

  function handleUpdate(e, newname, songlist) {
    e.preventDefault();
    if (newname === "") {
      setErrormessage("Please enter a songlist name!");
      return;
    }
    let req = { name: newname, uid: uid, _id: songlist._id };
    songService
      .updateSongLists(req)
      .then(() => {
        dispatch(userActions.getSongLists(uid));
        setErrormessage("");
      })
      .catch((error) => {
        setErrormessage(error.message.toString());
      });
  }

  function submitData(e, songList) {
    e.preventDefault();
    let data = {
      name: songList,
      uid: uid,
    };
    songService
      .addSongLists(data)
      .then(() => {
        dispatch(userActions.getSongLists(uid));
        console.log("Document successfully written!");
        setShow(false);
        setErrormessage("");
      })
      .catch((error) => {
        setErrormessage(error.message.toString());
      });
  }

  function onHide() {
    setShow(false);
  }

  return (
    <div>
      <Container fluid>
        <Row>
          {songlists &&
            songlists.map((song, index) => {
              return (
                <Col sm="4" key={index} style={{ marginTop: "20px" }}>
                  <SongListCard
                    key={index}
                    onButton={goSong}
                    song={song}
                    onDelete={handleDelete}
                    submitData={handleUpdate}
                    show={show}
                    errormessage={errormessage}
                  />
                </Col>
              );
            })}

          <Col sm="4" style={{ marginTop: "20px" }}>
            <Card style={{ textAlign: "center", height: "10em" }}>
              <Card.Body>
                <Card.Title style={{ fontSize: "175%" }}>
                  Add a new songlist
                </Card.Title>
                <div style={{ paddingTop: "0.5em" }}>
                  <Button variant="primary" onClick={() => setShow(true)}>
                    Add Song List
                  </Button>
                  <Popup
                    title="Add Song List"
                    pop={SongListForm({ submitData, errormessage })}
                    show={show}
                    onHide={onHide}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}