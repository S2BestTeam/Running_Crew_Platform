import api from "../axios";

export const reqCheckNickname = (data) =>
  api.post("/api/users/nickname", data, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });

export const reqRegisterUser = (data) => api.post("/api/users", data,);