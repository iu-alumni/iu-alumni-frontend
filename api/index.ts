import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:8080/",
    timeout: 30000,
});

axiosInstance.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("iu_alumni_token");
        if (token) config.headers.Authorization = "Bearer " + token;
    }
    return config;
});

export default axiosInstance;
