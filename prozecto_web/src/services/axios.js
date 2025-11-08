import axios from "axios";

const API_BASE_URL = "http://backend:5000";

const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
