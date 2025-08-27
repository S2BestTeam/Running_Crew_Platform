import { member } from "../../pages/Crew/Information/styles";
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

export const getCrewRole = (userId) => api.get(`/api/crews/${userId}/role`);

export const reqCrewThumbnailUpdate = (crewId, formData) => api.post(`/api/crews/${crewId}/thumbnail`, formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  }
})

export const reqCrewProfileUpdate = (crewId, formData) => api.post(`/api/crews/${crewId}/profile`, formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  }
})

export const reqCrewUpdate = (data) => api.patch(`/api/crews/update`, data);

export const reqCrewWithdraw = (memberId) => api.patch(`api/crews/${memberId}/withdraw`);