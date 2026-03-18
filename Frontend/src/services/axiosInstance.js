import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  headers: {
    "Content-Type": "application/json",
  },
});

/* 
   REQUEST INTERCEPTOR (IMPORTANT)
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");

    // console.log("INTERCEPTOR TOKEN ", token); // debug (temporary)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* RESPONSE INTERCEPTOR*/
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API ERROR", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;