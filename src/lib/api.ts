import axios, { AxiosResponse } from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "./token";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL, // آدرس پایه API
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/auth/refresh-token`,
            {
              refreshToken,
            }
          );
          const { accessToken, refreshToken: newRefreshToken } = data.data;
          setAccessToken(accessToken);
          setRefreshToken(newRefreshToken);
          axios.defaults.headers.common["authorization"] = `${accessToken}`;
          originalRequest.headers["authorization"] = `${accessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token failed:", refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
