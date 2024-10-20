import axios, { AxiosInstance } from "axios";

const baseURL = import.meta.env.VITE_API_URL;
const instance: AxiosInstance = axios.create({
  baseURL: baseURL,
});

export default instance;
