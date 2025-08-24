import api from "../axios";

export const reqCrewRankings = () => api.get('/api/ranking/crew');