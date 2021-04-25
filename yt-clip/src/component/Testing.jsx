import React, { useState, useEffect } from "react";
import { Button, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userActions } from "../_actions";
import { authHeader } from "../_helpers";
import { songService } from "../_services";
import SongListPage from "./SongList/SongListPage";
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
      name: "1111",
      urlid: "fasd123",
      start: "2",
      end: "20",
      listid: "60847cf53eb6d12034a05b89",
    };
    songService
      .addSongs(data)
      .then(() => {
        dispatch(userActions.getSongLists(uid));
      })
      .catch((error) => console.log(error.message));
  }
  // useEffect(() => {
  //   console.log(songs);
  // }, [songs]);

  function AddList() {
    let data = {
      name: "songlist8",
      uid: "60817c83e566a324d906c727",
    };
    songService
      .addSongLists(data)
      .then(() => {
        dispatch(userActions.getSongLists(uid));
      })
      .catch((error) => console.log(error.message));
  }

  return (
    <>
      <Button onClick={handleClick}> get list </Button>
      <Button onClick={handleAddClick}> add song </Button>
      <Button onClick={AddList}> add songlist </Button>
      <SongListPage />
      <Alert>This is a alert—check it out!</Alert>
    </>
  );
};
