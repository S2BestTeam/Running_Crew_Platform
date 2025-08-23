import api from "../axios";

export const reqGetCrewRankingTotalKM = () => api.get('/api/ranking/crew/totalKm');

export const reqGetCrewRankingCountMember = () => api.get('/api/ranking/crew/countMember');