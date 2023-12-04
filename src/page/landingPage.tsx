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
  console.log(`'HomePage'`);

  useEffect(() => {
    getFollowingList(setFollowingList);
    getForYouList(setForYouList);
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      {followingList.length > 0 &&
        followingList.map((following, index) => {
          return (
            <VideoPlayer
              key={`following${index}`}
              url={following.play_url}
              cover={following.cover}
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
              index={index + followingList.length}
              title={foryou.title}
            />
          );
        })}
    </div>
  );
};
