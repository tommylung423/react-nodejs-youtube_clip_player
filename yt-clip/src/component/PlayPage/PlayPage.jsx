import React, { useState, useEffect } from "react";
import "./youtubeplayer.css";
import "./playpage.css";
import _ from "lodash";
import Popup from "../common/popup";
import SongForm from "../common/songForm";
import ContinuousSlider from "../common/ContinuousSlider";
import Youtubeplayer from "./Youtubeplayer";
import Drag from "./Drag";
import { useSelector } from "react-redux";
import { userActions } from "../../_actions";
import { songService } from "./../../_services";
import { useDispatch } from "react-redux";
import fakeplayer from "../../img/fakeplayer.png";
import { Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
export const PlayPage = (props) => {
  const uid = useSelector((state) => state.authentication.user._id);
  const items = useSelector((state) => state.songlists.items);
  const songlistid = props.match.params.songlist;
  const dispatch = useDispatch();
  const [volume, setVolume] = useState(30);
  const [index, setIndex] = useState(0);
  const [songs, setSongs] = useState([]);
  const [show, setShow] = useState(false);

  function handleChange(e, newValue) {
    setVolume(newValue);
  }
  function handlePlay(index) {
    setIndex(index);
  }

  useEffect(() => {
    let mounted = true;
    songService.getSongs(songlistid).then((song) => {
      if (mounted) {
        setSongs(song);
      }
    });
    if (index >= songs.length - 2) {
      setIndex(0);
    }
    return () => {
      mounted = false;
    };
  }, [songlistid, items]);

  function onHide() {
    setShow(false);
  }

  //搵下一個index去play
  //run in onended
  function handleNext(index) {
    let nextindex = index + 1;
    if (nextindex >= songs.length) {
      nextindex = 0;
    }
    return setIndex(nextindex);
  }

  function addsong(e, req) {
    e.preventDefault();
    songService.addSongs(req);
    dispatch(userActions.getSongLists(uid));
    setShow(false);
  }

  function shuffle(songs) {
    let temp = songs;
    temp = _.shuffle(temp);
    let req = { songs: [] };
    temp.map((s) => req.songs.push(s._id));
    songService
      .sortSongs(songlistid, req)
      .then(dispatch(userActions.getSongLists(uid)))
      .catch((error) => console.log(error.message));
  }

  return (
    <React.Fragment>
      <div className="wrapper">
        <div className="box1">
          {songs[index] ? (
            <>
              <div className="subbox-1">
                <h1>{songs[index].name}</h1>
              </div>
              <div className="subbox-2">
                <Youtubeplayer
                  song={songs[index]}
                  handleNext={handleNext}
                  index={index}
                  volume={volume}
                />
              </div>
              <div className="subbox-3">
                <ContinuousSlider handleChange={handleChange} value={volume} />
              </div>
            </>
          ) : (
            <img src={fakeplayer} alt="fakeplayer" />
          )}
        </div>

        <div className="box2">
          <div className="subbox-1">
            {songs.length && (
              <h3>
                {index + 1}/{songs.length}
              </h3>
            )}
          </div>
          <div className="subbox-2">
            <Popup
              title="Add Song"
              pop={<SongForm addsong={addsong} listid={songlistid} />}
              show={show}
              onHide={onHide}
            />

            <Icon.PlusSquareFill
              onClick={() => {
                setShow(true);
              }}
            ></Icon.PlusSquareFill>

            <Icon.Shuffle onClick={() => shuffle(songs)}> </Icon.Shuffle>
          </div>

          <div className="aside">
            <Drag songs={songs} listid={songlistid} handlePlay={handlePlay} />
          </div>
        </div>
      </div>
    </React.Fragment>
    // <h1>123</h1>
  );
};

export default PlayPage;
