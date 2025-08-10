import api from "../axios";

export const reqGetInquiriesCrew = () => api.get("/inquiry/crews");

export const reqRegisterInquiryCrew = (inquiry) => api.post("/inquiry/crews/register", inquiry);

export const reqModifyInquiryCrew = (data) => api.put(`/inquiry/crews/${data.id}`, data);