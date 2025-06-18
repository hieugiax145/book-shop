import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    // } else {
      // config.headers["Content-Type"] = "application/json";
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 201) {
      response.success = true;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
