import api from "../axios";

export const reqRegisterUser = (data) => api.post("/api/users", data,);

export const reqPrincipal = async () => await api.get("/api/account/principal");