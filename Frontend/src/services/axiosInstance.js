import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // http://localhost:5000
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response Interceptor 
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API ERROR ", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;