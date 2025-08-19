import api from "../axios";

export const reqPrincipal = async () => await api.get("/api/account/principal");

export const reqCheckNickname = (nickname) =>
  api.get("/api/users/nickname/check", { params : {nickname} }, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });

export const reqRegisterUser = async (data) => await api.post("/api/users", data);

export const reqUpdateUser = (data) => api.post("/api/mypage", data, {
  headers: {
    "Content-Type": "multipart/form-data"
  }
});

export const reqGetUserWelcome = (userId) => api.get(`/api/mypage/${userId}`);

export const reqGetReportByUserId = (userId) => api.get(`/api/${userId}/reports`);

export const reqUserProfileUpdate = (userId, formData) => api.post(`/api/mypage/${userId}/profile-image`, formData, {
  headers: {
    "Content-Type": "mutipart/form-data",
  },
});