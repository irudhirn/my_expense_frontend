// import axios from "axios";

// export const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // important for cookies
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
  async (err) => {
    // if (err?.response?.status === 401) {
    //   // This event notifies the app but does NOT decide what to do
    //   window.dispatchEvent(new Event("unauthorized"));
    // }
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes("/users/refresh")) {
      originalRequest._retry = true;
      try{
        const res = await axiosInstance.post("/users/refresh");
        // console.log("refresh response", res);
        localStorage.setItem("accessToken", JSON.stringify(res.data.accessToken));
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${res.data.accessToken}`;
        return axiosInstance(originalRequest);
      }catch(refreshError){
        window.dispatchEvent(new Event("unauthorized"));
    
        return Promise.reject(err);
      }
    }

    if (err.response?.status === 401 || err.response?.status === 403) {
      window.dispatchEvent(new Event("unauthorized"));
    }
    return Promise.reject(err);

  }
);


/*

{
    "transitional": {
        "silentJSONParsing": true,
        "forcedJSONParsing": true,
        "clarifyTimeoutError": false
    },
    "adapter": [
        "xhr",
        "http",
        "fetch"
    ],
    "transformRequest": [
        null
    ],
    "transformResponse": [
        null
    ],
    "timeout": 0,
    "xsrfCookieName": "XSRF-TOKEN",
    "xsrfHeaderName": "X-XSRF-TOKEN",
    "maxContentLength": -1,
    "maxBodyLength": -1,
    "env": {},
    "headers": {
        "Accept": "application/json, text/plain, *",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YTAzZmZmOWVjOTM3NTkzYjgyN2ZmNiIsImlhdCI6MTc2MzcxMDc5NywiZXhwIjoxNzYzNzEwODU3fQ.zovhdn1hHFgtl-JLblwbMb_K4zderhQJt5Qhn8NTxdw"
    },
    "baseURL": "http://127.0.0.1:6600/api/v1",
    "withCredentials": true,
    "method": "get",
    "url": "/expense-categories?select=-createdAt",
    "allowAbsoluteUrls": true
}

*/