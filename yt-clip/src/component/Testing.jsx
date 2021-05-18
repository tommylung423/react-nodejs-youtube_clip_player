import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { userActions } from "../_actions";
import { songService } from "../_services";

export const Testing = () => {
  const dispatch = useDispatch();
  const data = [
    {
      name: "【ほしまちメドレー】星街すいせい 歌枠メドレー Vol.2 (Hoshimachi Suisei Medley Vol.2)【作業用BGM】",
      url: "https://www.youtube.com/watch?v=HgeQ_qWkX5k",
      start: "0",
      end: "0",
      listid: "60a11f9af7786b3488d94eb2",
    },

    {
      name: "【Hololive中文翻譯】超帥氣的Watame跳舞時間!!!!! 大家一起嗨起來~~ 角卷綿芽的廢萌片 【角巻わため 】",
      url: "https://www.youtube.com/watch?v=TDYAfaOpVsA",
      start: "0",
      end: "0",
      listid: "60a11f9af7786b3488d94eb2",
    },

    {
      name: "改良版「太極麻油雞」，香濃湯頭、雙重口感一次滿足｜簡單步驟快速上桌！｜阿慶師",
      url: "https://www.youtube.com/watch?v=IYW02gdTodM",
      start: "0",
      end: "0",
      listid: "60a11f9af7786b3488d94eb2",
    },

    {
      name: "【作業用BGM】鯊鯊的抒情神曲 Gawr Gura Singing Compilation",
      url: "https://www.youtube.com/watch?v=-Z5Xy9WYAh8",
      start: "0",
      end: "0",
      listid: "60a11f9af7786b3488d94eb2",
    },

    {
      name: "（Gura ）Singing compilation /gura唱歌大合輯",
      url: "https://www.youtube.com/watch?v=T0R6M38u4T4",
      start: "0",
      end: "0",
      listid: "60a11f9af7786b3488d94eb2",
    },

    {
      name: "D/Zeal「餞の鳥」 / ときのそら × 星街すいせい(Cover)",
      url: "https://www.youtube.com/watch?v=5yDNEmcKQFY",
      start: "0",
      end: "0",
      listid: "60a11f9af7786b3488d94eb2",
    },

    {
      name: "【トライアングラー／シェリル＆ランカ】アニメ主題歌『マクロスF』OP【Covered by 久遠たま✕宇津木沙和】",
      url: "https://www.youtube.com/watch?v=NszbLEwEoTY",
      start: "0",
      end: "0",
      listid: "60a11f9af7786b3488d94eb2",
    },

    {
      name: "【爐石戰記】扛轎少年團 - 完整版MV (feat.很多人)",
      url: "https://www.youtube.com/watch?v=hTPZoUx8gRo",
      start: "0",
      end: "0",
      listid: "60a11f9af7786b3488d94eb2",
    },
  ];
  const uid = "60817c83e566a324d906c727";

  function handleClick() {
    data.forEach((data) =>
      songService
        .addSongs(data)
        .then(dispatch(userActions.getSongLists(uid)))
        .catch((error) => console.log(error.message))
    );
  }

  return (
    <>
      <Button onClick={handleClick}> +++++ </Button>
    </>
  );
};
