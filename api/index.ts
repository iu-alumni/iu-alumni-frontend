import axios from "axios";

const axiosInstance = axios.create({
    timeout: 30000,
});

let baseURL: string | undefined;

axiosInstance.interceptors.request.use((config) => {
    if (!baseURL) {
        baseURL = useRuntimeConfig().public.apiBase as string;
    }
    config.baseURL = baseURL;
    const token = localStorage.getItem("iu_alumni_token");
    if (token) config.headers.Authorization = "Bearer " + token;
    return config;
});

export default axiosInstance;
