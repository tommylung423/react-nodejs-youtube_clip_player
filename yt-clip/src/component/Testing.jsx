import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userActions } from "../_actions";
import { authHeader } from "../_helpers";
import { songService } from "../_services";
export const Testing = () => {
  const songlists = useSelector((state) => state.songlists.items);
  const uid = useSelector((state) => state.authentication.user._id);
  const [songs, setSongs] = useState([]);

  const token = authHeader();
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(userActions.getSongLists(uid));
    songService
      .getSongs(songlists[0]._id)
      .then((s) => {
        setSongs(s);
      })
      .catch((error) => console.log(error.message));
  }

  function handleAddClick() {
    let data = {
      name: "song1",
      urlid: "fasd123",
      start: "2",
      end: "20",
      listid: "60817dc8e566a324d906c728",
    };
    songService
      .addSongs(data)
      .then(() => {
        handleClick();
      })
      .catch((error) => console.log(error.message));
  }
  useEffect(() => {
    console.log(songs);
  }, [songs]);

  function AddList() {
    let data = {
      name: "songlist1",
      uid: "60817c83e566a324d906c727",
    };
    songService
      .addSongLists(data)
      .then(() => {
        handleClick();
      })
      .catch((error) => console.log(error.message));
  }

  return (
    <>
      <Button onClick={handleClick}> get list </Button>
      <Button onClick={handleAddClick}> add song </Button>
      <Button onClick={AddList}> add songlist </Button>
    </>
  );
};
