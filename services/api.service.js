import axios from "axios";

const BASE_URL = import.meta.env.VITE_ENV_POINT_URL;

const api = axios.create({ baseURL: BASE_URL });

const refreshAccessToken = async () => {
  try {
    // Check if we are in a browser environment
    if (typeof window === "undefined" || typeof localStorage === "undefined") {
      // console.error("localStorage is not available in this environment");
      return null;
    }

    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      // console.error("No refresh token available in localStorage");
      throw new Error("No refresh token available");
    }

    const response = await axios.post(
      `${BASE_URL}/auth/refresh`, // Ensure BASE_URL is available
      { refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`, // Some APIs expect the refresh token in the Authorization header
        },
      }
    );

    const { accessToken, newRefreshToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", newRefreshToken || refreshToken);

    return accessToken;
  } catch (error) {
    console.error(
      "Error refreshing access token:",
      error.response ? error.response.data : error.message
    );
    // Clear tokens on refresh failure to prevent infinite loops
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
    throw error;
  }
};

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loops by checking retry count
    if (!originalRequest._retryCount) {
      originalRequest._retryCount = 0;
    }

    if (error.response?.status === 403 && originalRequest._retryCount < 1) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            originalRequest._retryCount += 1;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retryCount += 1;
      isRefreshing = true;

      try {
        const newAccessToken = await refreshAccessToken();
        processQueue(null, newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        // Redirect to login on refresh failure
        if (typeof window !== "undefined") {
          window.location.href = "/login-quotation";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response?.status === 401) {
      // Clear tokens on 401
      if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
      window.location.href = "/login-quotation";
    }

    return Promise.reject(error);
  }
);

export default () => api;

