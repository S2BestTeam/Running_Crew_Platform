import api from "../axios";

export const reqGetNotices = ({ crewId, page = 1, size = 10, searchText = "" }) =>
  api.get(`/api/notices/${crewId}`, {
    params: {page, size, searchText },
  });

export const reqGetNoticeDetail = (crewId,noticeId) =>  api.get(`/api/notices/${crewId}/detail/${noticeId}`);

export const reqRegisterNotice= ({ crewId, title, content }) =>
  api.post(`/api/notices/${crewId}`, { title, content }, {
    headers: { "Content-Type": "application/json" },
  });