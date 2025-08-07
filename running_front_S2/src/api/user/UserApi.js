import api from "../axios";

export const reqPrincipal = async () => await api.get("/api/account/principal");

export const reqCheckNickname = (nickname) =>
  api.post("/api/users/nickname", { data: nickname }, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
<<<<<<< HEAD
export const reqRegisterUser = async (data) => await api.post("/api/users", data);
=======
export const reqRegisterUser = async (data) => await api.post("/api/users", data);

export const reqUpdateUser = (data) => api.post("/api/mypage", data, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
});
>>>>>>> origin/10-mypage-데이터-불러오기-및-프로필-수정-설계
