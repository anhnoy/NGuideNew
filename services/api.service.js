// import axios from "axios";

// const BASE_URL = import.meta.env.VITE_ENV_POINT_URL;

// const api = axios.create({ baseURL: BASE_URL });

// const refreshAccessToken = async () => {
//   try {
//     const refreshToken = localStorage.getItem("refreshToken");
//     if (!refreshToken) {
//       console.error("No refresh token available in localStorage");
//       throw new Error("No refresh token available");
//     }

//     console.log("Attempting to refresh access token with:", refreshToken);

//     const response = await axios.post(
//       `${BASE_URL}/auth/refresh`, // Update the path here
//       { refreshToken },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${refreshToken}`, // Some APIs expect the refresh token in the Authorization header
//         },
//       }
//     );

//     console.log("Refresh token response:", response.data);

//     const { accessToken, newRefreshToken } = response.data;
//     localStorage.setItem("accessToken", accessToken);
//     localStorage.setItem("refreshToken", newRefreshToken || refreshToken); // Use new refresh token if provided, otherwise keep the old one
//     return accessToken;
//   } catch (error) {
//     console.error(
//       "Error refreshing access token:",
//       error.response ? error.response.data : error.message
//     );
//     if (error.response && error.response.status === 400) {
//       console.error(
//         "Bad request when refreshing token. Server response:",
//         error.response.data
//       );
//     }
//     // Don't remove tokens here, let the calling code decide what to do
//     throw error;
//   }
// };

// api.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem("accessToken");
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 403) {
//       // Check for forbidden error
//       if (!originalRequest._retry) {
//         originalRequest._retry = true;
//         try {
//           const newAccessToken = await refreshAccessToken();
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//           return api(originalRequest);
//         } catch (refreshError) {
//           console.error("Failed to refresh access token:", refreshError);
//           return Promise.reject(refreshError);
//         }
//       }
      
//       // If already retried and still 403, handle accordingly if needed
//     }
//     if (error.response.status === 401) {
//       console.error("Unauthorized - Redirecting to login");
//       // Handle redirection logic here
//       // Assuming you have a method to redirect to the login page
//       window.location.href = "/login-quotation"; // Replace this with your router logic if necessary
//       return Promise.reject(error);
//     }
//     return Promise.reject(error);
//   }
// );

// export default () => api;


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

    if (error.response?.status === 403 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newAccessToken = await refreshAccessToken();
        processQueue(null, newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response?.status === 401) {
      window.location.href = "/login-quotation";
    }

    return Promise.reject(error);
  }
);

export default () => api;

