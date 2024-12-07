import axios from "axios";

const API = import.meta.env.VITE_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem("authToken");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
