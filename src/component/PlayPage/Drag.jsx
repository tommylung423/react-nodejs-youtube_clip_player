import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./drag.css";
import * as Icon from "react-bootstrap-icons";
import SongForm from "../common/songForm";
import Popup from "../common/popup";
import { songService } from "./../../_services";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userActions } from "./../../_actions/user.actions";
import ReactPlayer from "react-player";

function Drag(props) {
  const [songs, setSongs] = useState([]);
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.authentication.user._id);
  const [show, setShow] = useState(false);
  const [parameter, setParameter] = useState({});

  const playerRef = useRef([]);

  useEffect(() => {
    setSongs(props.songs);
    playerRef.current = playerRef.current.slice(0, props.songs.length);
  }, [props.songs]);

  // update order
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    let req = { songs: [] };
    const items = Array.from(props.songs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSongs(items);
    items.map((s) => req.songs.push(s._id));
    songService
      .sortSongs(props.listid, req)
      .then(dispatch(userActions.getSongLists(uid)))
      .catch((error) => console.log(error.message));
  }

  function submitData(e, req, id) {
    e.preventDefault();
    if (parseInt(req.start) > parseInt(req.end) && parseInt(req.end) !== 0) {
      alert("End time must be larger than start time");
      return;
    }
    songService
      .updateSongs(id, req)
      .then(() => {
        dispatch(userActions.getSongLists(uid));
        setShow((s) => !s);
      })
      .catch((error) => console.log(error.message));
  }

  function onHide() {
    setShow(false);
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
                              onClick={() => {
                                props.handlePlay(index);
                                playerRef.current[index].showPreview();
                              }}
                            >
                              <ReactPlayer
                                url={song.url}
                                light={true}
                                ref={(el) => (playerRef.current[index] = el)}
                                width="90%"
                                height="90%"
                              />
                            </div>
                            <p
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                props.handlePlay(index);
                              }}
                            >
                              {song.name}
                            </p>
                            <div
                              className="icon-area"
                              style={{ cursor: "pointer" }}
                            >
                              <div className="icon-group">
                                <div className="top">
                                  <Icon.FileText
                                    className="smallIcon"
                                    onClick={() => {
                                      setShow(true);
                                      setParameter(song);
                                    }}
                                  ></Icon.FileText>
                                </div>
                                <div className="bottom">
                                  <Icon.TrashFill
                                    className="smallIcon"
                                    onClick={() =>
                                      props.removeSong(song._id, index)
                                    }
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
        {show && (
          <Popup
            title="Add Song"
            pop={
              <SongForm
                song={parameter}
                listid={parameter.listid}
                submitData={submitData}
              />
            }
            show={show}
            onHide={onHide}
          />
        )}
      </header>
    </div>
  );
}

export default Drag;
