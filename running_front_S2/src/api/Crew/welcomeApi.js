import api from "../axios";

export const reqJoinCrew = (crewId, data) => api.post(`/api/welcomes/${crewId}`, data);

export const reqCrewWelcomes = (crewId) => api.get(`/api/welcomes/${crewId}`);
