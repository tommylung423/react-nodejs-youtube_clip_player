import React, { useState, useEffect } from "react";
import { songService } from "../../_services";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userActions } from "../../_actions";
import { Card, Container, Row, Col } from "react-bootstrap";
import Popup from "./../common/popup";
import SongListForm from "./../common/songListForm";
import { history } from "./../../_helpers/history";
import SongListCard from "./SongListCard";
export default function SongListPage() {
  const songlists = useSelector((state) => state.songlists.items);
  const uid = useSelector((state) => state.authentication.user._id);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [errormessage, setErrormessage] = useState("");

  function goSong(songlist) {
    console.log(songlist);
    history.replace(`/test/${songlist._id}`);
  }

  function handleDelete(songlist) {
    if (window.confirm("Are you sure you wish to delete this songlist?")) {
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
    if (newname == "") {
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
        setShow(!show);
        setErrormessage("");
      })
      .catch((error) => {
        setErrormessage(error.message.toString());
      });
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
                  <Popup
                    name="Add Song List"
                    title="Add Song List"
                    pop={SongListForm({ submitData, errormessage })}
                    show={show}
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
