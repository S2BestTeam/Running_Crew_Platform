import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10000,
});

api.interceptors.request.use((config) => {
    const lsAccessToken = localStorage.getItem("AccessToken");
    if (!!lsAccessToken) {
        config.headers.Authorization = lsAccessToken;
    }
    return config;
});

export default api;