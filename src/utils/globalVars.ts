// import axios from "axios";

// export const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (request) => {
    const token = JSON.parse(localStorage.getItem("accessToken"));
    if (token) request.headers.Authorization = "Bearer " + token;
    return request;
  },
  (err) => Promise.reject(err)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err?.response?.status === 401) {
      // This event notifies the app but does NOT decide what to do
      window.dispatchEvent(new Event("unauthorized"));
    }

    return Promise.reject(err);
  }
);
