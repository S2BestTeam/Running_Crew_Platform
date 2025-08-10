import api from "../axios";

export const reqCheckCrewName = (crewName) => api.post("/api/crews/crewName", {data : crewName }, {
  headers: {
      'Content-Type': 'application/json; charset=utf-8',
  },
});

export const reqGetCrew = (crewId) => api.get(`/api/crews/${crewId}`);

export const reqGetCrewList = ({ page, size, searchText, gunguId }) =>
  api.get("/api/crews", {
    params: { page, size, searchText, gunguId },
  });

export const reqRegisterCrew = (data) => api.post("/api/crews", data, {
  headers: {
    "Content-Type": "multipart/form-data",
  }
});