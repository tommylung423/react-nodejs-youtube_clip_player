import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./drag.css";
import * as Icon from "react-bootstrap-icons";
import SongForm from "../common/songForm";
import Popup from "../common/popup";
import { songService } from "./../../_services";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userActions } from "./../../_actions/user.actions";

var smallIcon = {
  fontSize: 30,
  marginTop: "10px",
  marginBottom: "10px",
};

function Drag(props) {
  const [songs, setSongs] = useState([]);
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.authentication.user._id);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setSongs(props.songs);
  }, [props.songs]);

  // remove song
  function removeSong(id, index) {
    if (window.confirm("Are you sure to delete this song?")) {
      songService
        .delSongs(id)
        .then(() => {
          dispatch(userActions.getSongLists(uid));
        })
        .catch((error) => console.log(error.message));
    }
  }

  // update order
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    let req = { songs: [] };
    const items = Array.from(songs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSongs(items);
    items.map((s) => req.songs.push(s._id));
    console.log(props.listid);
    songService
      .sortSongs(props.listid, req)
      .then(dispatch(userActions.getSongLists(uid)))
      .catch((error) => console.log(error.message));
  }

  function submitData(e, req, id) {
    e.preventDefault();
    songService
      .updateSongs(id, req)
      .then(() => {
        dispatch(userActions.getSongLists(uid));
        setShow((s) => !s);
      })
      .catch((error) => console.log(error.message));
  }

  return (
    <div className="App">
      <header className="App-header">
        {songs && (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="songs">
              {(provided) => (
                <ul
                  className="songs"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {songs.map((song, index) => {
                    return (
                      <Draggable
                        key={song._id}
                        draggableId={song._id}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div
                              className="songs-thumb"
                              style={{ cursor: "pointer" }}
                            >
                              <img
                                src={
                                  "https://img.youtube.com/vi/" +
                                  song.urlid +
                                  "/1.jpg"
                                }
                                alt={`${song.name} Thumb`}
                                onClick={() => {
                                  props.handlePlay(index);
                                }}
                              />
                            </div>
                            <p style={{ cursor: "pointer" }}>{song.name}</p>
                            <div
                              className="icon-area"
                              style={{ cursor: "pointer" }}
                            >
                              <div className="icon-group">
                                <div className="top">
                                  <Popup
                                    name="Add Song List"
                                    title="Add Song"
                                    pop={
                                      <SongForm
                                        song={song}
                                        listid={song.listid}
                                        submitData={submitData}
                                      />
                                    }
                                    show={show}
                                    mode="FileText"
                                  />
                                </div>
                                <div className="bottom">
                                  <Icon.TrashFill
                                    style={smallIcon}
                                    onClick={() => removeSong(song._id, index)}
                                  />
                                </div>
                              </div>
                            </div>
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </header>
    </div>
  );
}

export default Drag;
