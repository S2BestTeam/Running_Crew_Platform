import api from "./axios";

export const useApiGungu = async () => await api.get("/api/regions/gungu")