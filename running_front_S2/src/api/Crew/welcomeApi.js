import api from "../axios";

export const reqJoinCrew = (crewId, data) => api.post(`/api/welcomes/${crewId}`, data);

export const reqCrewWelcomes = (crewId) => api.get(`/api/welcomes/${crewId}`);

// Member 거절
export const reqRejectCrewMember = (data) => api.patch(`/api/welcomes`, data);