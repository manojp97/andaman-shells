import axios from "axios";

const BASE_URL = "https://andaman-shells-backend.onrender.com/api";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // 
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          `${BASE_URL}/auth/refresh-token`,
          {},
          {
            withCredentials: true, 
          }
        );

        const payload = refreshResponse.data?.data || refreshResponse.data;

        const newToken =
          payload?.accessToken || payload?.token;

        if (newToken) {
          localStorage.setItem("authToken", newToken);

          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          return API(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("authUser");
      }
    }

    return Promise.reject(error);
  }
);

export default API;