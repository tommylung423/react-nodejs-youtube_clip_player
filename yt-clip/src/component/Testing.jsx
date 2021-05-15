import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userActions } from "../_actions";
<<<<<<< HEAD
import { songService } from "../_services";
import Drag from "./PlayPage/Drag";
import Popup from "./common/popup";
import SongForm from "./common/songForm";
=======
import { authHeader } from "../_helpers";
import { songService } from "../_services";
>>>>>>> a83ad60a090e58a9f8ed852680bc5625ab544dac
export const Testing = () => {
  const songlists = useSelector((state) => state.songlists.items);
  const uid = useSelector((state) => state.authentication.user._id);
  const [songs, setSongs] = useState([]);
<<<<<<< HEAD
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const [fetchSongs] = await Promise.all([
        songService.getSongs("6087dbdc8354c946201e60c6"),
      ]);
      setSongs(fetchSongs);
      console.log(fetchSongs);
    };
    fetchData();
  }, [songlists]);

  function handleClick() {
    dispatch(userActions.getSongLists(uid));
    console.log(songs);
  }

  function addsong(e, req) {
    e.preventDefault();
    songService.addSongs(req);
    dispatch(userActions.getSongLists(uid));
  }

  return (
    <>
      <Button onClick={handleClick}> get list </Button>
      <Popup
        name="Add Song"
        title="Add Song"
        pop={<SongForm addsong={addsong} listid={"6087dbdc8354c946201e60c6"} />}
      />

      <Drag songs={songs} listid={"6087dbdc8354c946201e60c6"} />
    </>
  );
=======

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
>>>>>>> a83ad60a090e58a9f8ed852680bc5625ab544dac
};
