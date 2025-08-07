import api from "../axios";

export const reqGetCrew = (crewId) => api.get(`/api/crews/${crewId}`);
export const reqGetCrewList = ({ page, size, searchText, gunguId }) =>
  api.get("/api/crews", {
    params: { page, size, searchText, gunguId },
  });
