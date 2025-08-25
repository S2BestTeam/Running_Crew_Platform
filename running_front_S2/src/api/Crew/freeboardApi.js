import api from "../axios";

export const reqGetFreeBoards = ({ crewId, page = 1, size = 10, searchText = "" }) =>
  api.get(`/api/freeBoards/${crewId}`, {
    params: {page, size, searchText },
  });

export const reqGetFreeFeedDetail = (crewId,freeId) =>  api.get(`/api/freeBoards/${crewId}/detail/${freeId}`);

export const reqRegisterFreeBoard = ({ crewId, title, content }) =>
  api.post(`/api/freeBoards/${crewId}`, { title, content }, {
    headers: { "Content-Type": "application/json" },
  });

// export const reqGetAllFeedList = (userId) => api.get(`/api/`)

export const reqRegisterComment = (comment, crewId, freeId) =>
  api.post(`/api/freeBoards/${crewId}/detail/${freeId}`, {
    crewId,
    freeId,
    content: comment,
  });

export const reqGetFreeCommentList = (crewId,freeId) => api.get(`/api/freeBoards/${crewId}/detail/${freeId}/comments`)

 