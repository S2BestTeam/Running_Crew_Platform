import api from "../axios";

export const reqRegisterGathering = (crewId, data) =>
  api.post(`/api/crews/${crewId}/gathering`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
