import axios from "axios";

const baseURL = "http://localhost:3000";

const client = axios.create({
  baseURL: "http://localhost:3000",
});
export const getFollowingList = async (setFollowingList) => {
  await client.get("/following_list").then((response) => {
    setFollowingList(response.data.items);
  });
};

export const getForYouList = async (setForYouList) => {
  await client.get("/for_you_list").then((response) => {
    setForYouList(response.data.items);
  });
};
