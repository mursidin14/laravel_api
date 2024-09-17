import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API + '/api'
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if(token) {
        config.headers.Authorization = `${token}`;
    }
    return config;
});

export { axiosClient };