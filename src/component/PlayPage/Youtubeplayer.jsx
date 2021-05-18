import React, { useState, useEffect } from "react";
import YouTube from "@u-wave/react-youtube";
import "./playpage.css";

function Youtubeplayer(props) {
  const { handleNext, index, song, volume } = props;
  const [url, seturl] = useState("");
  const [start, setStart] = useState(0);

  useEffect(() => {
    var patt = new RegExp("^(http(s)?://)?((w){3}.)?youtu(be|.be)?(.com)?/.+");
    seturl(null);
    setTimeout(() => {
      if (patt.test(song.url)) {
        const arr = song.url.split(
          /(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/
        );
        const urlid = arr[2] ? arr[2].split(/[^\w-]/i)[0] : "";
        seturl(urlid);
        setStart(song.start + 0.1);
      }
    }, 100);
  }, [props.song._id, song]);

  return (
    <>
      <YouTube
        height="100%"
        width="100%"
        id={song._id}
        video={url}
        paused={false}
        volume={volume / 100}
        controls={false}
        autoplay
        onPlaying={() => props.onPlay()}
        onEnd={() => handleNext(index)}
        startSeconds={start}
        endSeconds={song.end}
      />
    </>
  );
}

export default Youtubeplayer;
