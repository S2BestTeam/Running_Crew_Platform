import api from "../axios";

export const reqCrewDetail = (crewId) => api.get(`/api/crews/${crewId}`);

export const reqCheckCrewName = (crewName) =>
  api.get("/api/crews/duplicate/name", {
  params: { crewName },
});

export const reqRegisterCrew = (data) =>
  api.post("/api/crews", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const reqGetCrewList = ({ page, size, gunguId, searchText }) => {
  return api.get("/api/crews", {
    params: { page, size, gunguId, searchText },
  });
};