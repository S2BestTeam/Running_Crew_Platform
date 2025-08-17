import api from "../axios";

export const reqCrewDetail = (crewId) => api.get(`/api/crews/${crewId}`);

export const reqCheckCrewName = (crewName) => api.post("/api/crews/crewName", {data : crewName }, {
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
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

export const reqJoinCrew = (crewId, data) => api.post(`/api/crews/${crewId}/welcome`, data);

export const reqCrewWelcomes = (crewId) => api.get(`/api/crews/${crewId}/welcomes`);

export const reqRegisterCrewMember = (data) => api.post(`/api/crew/${data.crewId}/member`, data);