import api from "../axios";

export const reqCrewDetail = (crewId) => api.get(`/api/crews/${crewId}`);

export const reqCheckCrewName = (crewName) =>
  // api.post(
  //   "/api/crews/crewName",
  //   { data: crewName },
  //   {
  //     headers: {
  //       "Content-Type": "application/json; charset=utf-8",
  //     },
  //   }
    api.get("/api/crews/duplicate/name", {
    params: { crewName },
  });
  // );

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

export const reqJoinCrew = (crewId, data) => api.post(`/api/welcomes/${crewId}`, data);

export const reqCrewWelcomes = (crewId) => api.get(`/api/welcomes/${crewId}`);

export const reqRegisterCrewMember = (data) => api.post(`/api/members`, data);

export const reqGetCrewMembers = ({ page, size, crewId, searchText }) => {
  return api.get(`/api/members`, {
    params: { page, size, crewId, searchText },
  });
};
export const reqGetMemberDetail = (memberId) => api.get(`/api/members/${memberId}`);

export const reqUpdateMemberRole = ({ memberId, roleId }) => api.put(`/api/members/${memberId}/role`, {memberId, roleId});

export const reqExpelMember = ({ crewId, userId }) => api.delete(`/api/crews/${crewId}/members/${userId}/expel`);

export const reqReportMember = ({ crewId, userId, reason }) => api.post(`/api/crews/${crewId}/members/${userId}/report`, {reason});

export const reqGetReportList = ({crewId}) => api.get(`/api/crews/${crewId}/members/report`);
