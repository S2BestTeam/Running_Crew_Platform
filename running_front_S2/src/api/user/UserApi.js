import api from "../axios";

export const reqRegisterUser = (data) => api.post("/api/users", data);