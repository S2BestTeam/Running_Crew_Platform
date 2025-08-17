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

export const reqGetCrewMembers = ({ page, size, crewId, searchText }) => {
  return api.get(`/api/crews/${crewId}/members`, {
    params: { page, size, crewId, searchText },
  });
};

export const reqGetMemberDetail = ({ crewId, userId }) => api.get(`/api/crews/${crewId}/members/${userId}`);

export const reqGrantMember = ({ crewId, userId }) =>
  api.post(`/api/crews/${crewId}/members/${userId}/grant`);

export const reqExpelMember = ({ crewId, userId }) =>
  api.delete(`/api/crews/${crewId}/members/${userId}/expel`);

export const reqJoinCrew = (crewId, data) => api.post(`/api/crews/${crewId}/welcome`, data);

export const reqCrewWelcomes = (crewId) => api.get(`/api/crews/${crewId}/welcomes`);

export const reqRegisterCrewMember = (data) => api.post(`/api/crew/${data.crewId}/member`, data);
