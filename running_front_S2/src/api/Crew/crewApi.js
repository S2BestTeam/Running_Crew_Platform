import axios from "axios";

export const reqGetCrewList = ({ page, size, gunguId, searchText }) => {
  return axios.get("/api/crews", {
    params: { page, size, gunguId, searchText },
  });
};