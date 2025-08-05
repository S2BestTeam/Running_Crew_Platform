import api from "./axios";

export const reqGungu =  () => api.get("/api/regions/gungus");