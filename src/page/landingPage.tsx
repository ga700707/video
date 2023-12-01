import React, { useEffect, useState } from "react";
import { getFollowingList, getForYouList } from "../api/api.tsx";
import { VideoPlayer } from "./player";
interface videoProps {
  title: string;
  cover: string;
  play_url: String;
}
export const HomePage = () => {
  const [followingList, setFollowingList] = useState<videoProps[]>([]);
  const [forYouList, setForYouList] = useState<videoProps[]>([]);
  const [playIndex, setPlayIndex] = useState(0);
  useEffect(() => {
    getFollowingList(setFollowingList);
    getForYouList(setForYouList);
  }, []);
  const changePlayer = (index) => {
    setPlayIndex(index);
  };
  let m1 = 0; 
  let m2 = 0; 
  var timer: any;
  const Data = () => {
    m2 = document.documentElement.scrollTop || document.body.scrollTop;
    if (m2 === m1) {
      const target = document.getElementById(`player_${playIndex}`);
      if (target) window.scrollTo(0, target?.offsetTop);
    }
  };
  document.onscroll = function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(Data, 300);
    m1 = document.documentElement.scrollTop || document.body.scrollTop;
  };

  return (
    <div style={{ height: "100vh" }}>
      {followingList.length > 0 &&
        followingList.map((following, index) => {
          return (
            <VideoPlayer
              key={`following${index}`}
              url={following.play_url}
              cover={following.cover}
              playing={index === playIndex}
              changePlayer={changePlayer}
              index={index}
              title={following.title}
            />
          );
        })}
      {forYouList.length > 0 &&
        forYouList.map((foryou, index) => {
          return (
            <VideoPlayer
              key={`foryou${index}`}
              url={foryou.play_url}
              cover={foryou.cover}
              playing={index + followingList.length === playIndex}
              changePlayer={changePlayer}
              index={index + followingList.length}
              title={foryou.title}
            />
          );
        })}
    </div>
  );
};
