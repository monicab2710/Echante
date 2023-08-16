import axios, { AxiosInstance } from "axios";

const API_URL = "http://localhost:8081/api";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;