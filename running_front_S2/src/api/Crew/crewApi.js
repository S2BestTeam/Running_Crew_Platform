import api from "../axios";

export const reqCrewDetail = async (crewId) => await api.get(`/api/crews/${crewId}`);