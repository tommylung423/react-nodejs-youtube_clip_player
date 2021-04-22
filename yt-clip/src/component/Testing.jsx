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
        setSongs(...songs, s);
      })
      .catch((error) => console.log(error.message));
  }

  useEffect(() => {
    console.log(songs);
  }, [songs]);
  return <Button onClick={handleClick}> get list </Button>;
};
