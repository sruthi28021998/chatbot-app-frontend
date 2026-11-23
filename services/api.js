import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  timeout: 45000,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const url = err.config?.url || "";
    const isAuthCall = url.includes("/auth/login") || url.includes("/auth/register");
    if (err.response?.status === 401 && !isAuthCall && typeof window !== "undefined") {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;