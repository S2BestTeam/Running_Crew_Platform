import api from "../axios";

export const reqGetFreeBoards = ({ crewId, page = 1, size = 10, searchText = "" }) =>
  api.get(`/api/freeBoards/${crewId}`, {
    params: {page, size, searchText },
  });

export const reqGetFreeFeedDetail = (freeId) =>  api.get(`/api/freeBoards/${freeId}`);

export const reqRegisterFreeBoard = ({ crewId, title, content }) => api.post(`/api/freeBoards/${crewId}`, { title, content });