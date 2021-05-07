import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import "./player.css";
function Youtubeplayer(props) {
  const { volume, handleNext, index } = props;
  const [url, seturl] = useState("");

  useEffect(() => {
    seturl(``);
    seturl(
      `https://www.youtube.com/watch?v=${props.song.urlid}?start=${props.song.start}&end=${props.song.end}`
    );
    console.log(props.song);
  }, [props]);

  return (
    <ReactPlayer
      className="react-player"
      width="95%"
      height="90%"
      url={url}
      volume={volume / 100}
      onEnded={() => handleNext(index)}
      controls={true}
      config={{
        youtube: {
          playerVars: {
            controls: 0,
            disablekb: 1,
            origin: "http://localhost:3000",
          },
        },
      }}
    />
  );
}

export default Youtubeplayer;
