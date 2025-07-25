import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://www.xdkomel.ru/",
    timeout: 30000,
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("iu_alumni_token");
    if (token) config.headers.Authorization = "Bearer " + token;
    return config;
});

export default axiosInstance;
