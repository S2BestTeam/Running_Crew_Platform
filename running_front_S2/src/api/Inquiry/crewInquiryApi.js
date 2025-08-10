import api from "../axios";

export const reqRegisterInquiryCrew = (data) => api.post("/inquiry/crew", data);