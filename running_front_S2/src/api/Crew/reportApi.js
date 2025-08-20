import api from "../axios";

export const reqReportMember = ({ crewId, userId, reason }) => api.post(`/api/reports/crews/${crewId}`, {userId, reason});

export const reqGetReportList = ({crewId}) => api.get(`/api/reports/crews/${crewId}`);
