import axios, { AxiosInstance } from "axios";

const API_URL = "https://localhost:8081/api/v1";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;