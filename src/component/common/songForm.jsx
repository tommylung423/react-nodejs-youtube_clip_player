import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import "../../css/songform.css";
import Cleave from "cleave.js/react";

function SongForm(props) {
  const [url, setUrl] = useState("");
  const [urlid, setUrlid] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [songTitle, setSongTitle] = useState("");

  const API_KEY = "AIzaSyBH72Mc9p_NdjAzFniCsvq4tOQqE1O3ibM";
  const { song, listid, submitData, addsong } = props;

  useEffect(() => {
    if (song) {
      setUrlid(song.urlid);
      setStartTime(song.start);
      setEndTime(song.end);
      setSongTitle(song.name);
      setUrl(song.url);
    }
  }, [song]);

  function getYouTubeId(url) {
    const arr = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return arr[2] ? arr[2].split(/[^\w-]/i)[0] : "";
  }

  function getStart(url) {
    let starttime = url.split("t=")[1];
    if (starttime && starttime.includes(":")) {
      starttime = countSeconds(starttime);
    }
    console.log(starttime);
    return setStartTime(parseInt(starttime));
  }

  function toHHMMSS(secs) {
    var sec_num = parseInt(secs, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;
    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .join(":");
  }
  function countSeconds(str) {
    var count = (str.match(/:/g) || []).length;
    var [hh = "0", mm = "0", ss = "0"] = "";
    if (count === 1) {
      [mm = "0", ss = "0", hh = "0"] = str.split(":");
    }
    if (count === 2) {
      [hh = "0", mm = "0", ss = "0"] = str.split(":");
    }
    const hour = parseInt(hh, 10) || 0;
    const minute = parseInt(mm, 10) || 0;
    const second = parseInt(ss, 10) || 0;
    return hour * 3600 + minute * 60 + second;
  }
  function GetTime(e, str) {
    let string = e.target.value;
    string.padEnd(8, 0);
    let seconds = countSeconds(e.target.value);
    return str === "start" ? setStartTime(seconds) : setEndTime(seconds);
  }

  async function getYoutubeDetail(YOUTUBE_VIDEO_ID) {
    try {
      let url =
        "https://www.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&id=" +
        YOUTUBE_VIDEO_ID +
        "&fields=items(id,snippet,contentDetails)&key=" +
        API_KEY;
      let response = await fetch(url);
      let responseJson = await response.json();
      if (responseJson.items.length > 0) {
        if (songTitle === "") {
          setSongTitle(responseJson.items[0].snippet.title);
        }
      }
    } catch (error) {
      console.error(error);
    }
    return;
  }

  return (
    <div className="song-form">
      <Form
        onSubmit={(e) => {
          let req = {
            name: songTitle,
            url: url,
            start: startTime,
            end: endTime,
            listid: listid,
          };
          submitData ? submitData(e, req, song._id) : addsong(e, req);
        }}
      >
        <Form.Group controlId="formYouTubeUrl">
          <Form.Label>Url</Form.Label>
          <Form.Control
            type="url"
            pattern="^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+"
            placeholder="https://www.youtube.com/watch?v="
            onChange={(e) => {
              setUrlid(getYouTubeId(e.target.value));
              getStart(e.target.value);
              setUrl(e.target.value);
            }}
            onBlur={() => getYoutubeDetail(urlid, API_KEY)}
            value={url}
            required
          />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formId">
            <Form.Label>id</Form.Label>
            <Form.Control disabled value={urlid} />
          </Form.Group>
          <Form.Group as={Col} controlId="formSong">
            <Form.Label>歌名</Form.Label>
            <Form.Control
              type="text"
              placeholder="Auto fill by the Youtube title"
              onChange={(e) => setSongTitle(e.target.value)}
              value={songTitle}
              required
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formStart">
            <Form.Label>Start</Form.Label>
            <Cleave
              className="form-control"
              placeholder="hh:mm:ss"
              options={{ time: true, timePattern: ["h", "m", "s"] }}
              // onChange={(e) => GetTime(e, "start")}
              onBlur={(e) => GetTime(e, "start")}
              value={toHHMMSS(startTime)}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formEnd">
            <Form.Label>End</Form.Label>

            <Cleave
              className="form-control"
              placeholder="hh:mm:ss"
              options={{ time: true, timePattern: ["h", "m", "s"] }}
              onBlur={(e) => GetTime(e, "end")}
              value={toHHMMSS(endTime)}
              required
            />
          </Form.Group>
        </Form.Row>

        <Button
          variant="primary"
          type="submit"
          style={{
            marginLeft: "Auto",
            marginRight: "Auto",
            display: "block",
            width: "90px",
            height: "44px",
          }}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default SongForm;
