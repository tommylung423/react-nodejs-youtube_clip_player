import React, { useState, useEffect } from "react";
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
  const [playing, setPlaying] = useState(false);
  const [bug, setBug] = useState(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songlistid, items]);

  function onHide() {
    setShow(false);
  }
  function handlebug() {
    setBug(true);
  }

  function handleNext(index) {
    console.log(bug);
    if (bug) {
      let nextindex = index + 1;
      if (nextindex >= songs.length) {
        nextindex = 0;
      }
      setIndex(nextindex);
      setPlaying(true);
      setBug(false);
      console.log("123");
    }
  }

  function addsong(e, req) {
    e.preventDefault();
    if (parseInt(req.start) > parseInt(req.end) && parseInt(req.end) !== 0) {
      alert("End time must be larger than start time");
      return;
    }
    songService
      .addSongs(req)
      .then(dispatch(userActions.getSongLists(uid)))
      .catch((error) => console.log(error.message));
    setShow(false);
  }

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
                  onPlay={handlebug}
                  index={index}
                  volume={volume}
                  playing={playing}
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
            {songs.length ? (
              <h3>
                {index + 1}/{songs.length}
              </h3>
            ) : (
              <h3>0</h3>
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
              className="button"
              onClick={() => {
                setShow(true);
              }}
            ></Icon.PlusSquareFill>

            <Icon.Shuffle className="button" onClick={() => shuffle(songs)}>
              {" "}
            </Icon.Shuffle>
          </div>

          <div className="aside">
            <Drag
              songs={songs}
              listid={songlistid}
              handlePlay={handlePlay}
              removeSong={removeSong}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
    // <h1>123</h1>
  );
};

export default PlayPage;
