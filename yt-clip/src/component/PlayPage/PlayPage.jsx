import React, { useState, useEffect, useLayoutEffect } from "react";
import "./player.css";
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
    async function fecthData() {
      const song = await songService.getSongs(songlistid);
      setSongs(song);
    }
    fecthData();
  }, [songlistid, items]);

  useEffect(() => {
    if (index < 0) {
      setSongs([]);
      setIndex(0);
    }
  }, [index]);

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
    setShow((s) => !s);
  }

  function indexRemove(del) {
    console.log(del);
    console.log(index);
    console.log(songs.length - 1);

    if (del === index) {
      if (del === songs.length - 1) setIndex(songs.length - 2);
    }
    console.log(index);
  }

  return (
    <React.Fragment>
      <div className="row" style={{ marginTop: "30px", height: "75%" }}>
        <div className="col-8 col-s-9" style={{ height: "100%" }}>
          {songs.length ? (
            <>
              <h1>{songs[index].name}</h1>
              <Youtubeplayer
                song={songs[index]}
                handleNext={handleNext}
                index={index}
                volume={volume}
              />
            </>
          ) : (
            <img src={fakeplayer} alt="fakeplayer" />
          )}
          <ContinuousSlider handleChange={handleChange} value={volume} />
        </div>

        <div
          className="col-3 col-s-12"
          style={{ padding: "0", height: "100%" }}
        >
          <Popup
            name="Add Song"
            title="Add Song"
            pop={<SongForm addsong={addsong} listid={songlistid} />}
            show={show}
          />

          <div className="aside" style={{ height: "75%" }}>
            <Drag
              songs={songs}
              listid={songlistid}
              handlePlay={handlePlay}
              indexRemove={indexRemove}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
    // <h1>123</h1>
  );
};

export default PlayPage;
