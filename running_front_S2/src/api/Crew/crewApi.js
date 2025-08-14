import api from "../axios";

<<<<<<< HEAD
export const reqCrewDetail = async (crewId) => await api.get(`/api/crews/${crewId}`);
=======
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
>>>>>>> origin/20-crew-register
