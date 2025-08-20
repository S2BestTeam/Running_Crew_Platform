import api from "../axios";

export const reqCrewGatherings = (crewId) =>
  api.get(`/api/crews/${crewId}/gatherings`);

export const reqRegisterGathering = (crewId, data) =>
  api.post(`/api/crews/${crewId}/gatherings`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
