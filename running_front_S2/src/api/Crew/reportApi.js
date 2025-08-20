import api from "../axios";

export const reqReportMember = ({ userId, reason }) => api.post(`/api/reports`, {reason});

export const reqGetReportList = ({crewId}) => api.get(`/api/crews/${crewId}/members/report`);
