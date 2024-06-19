import axios from "axios";
import { API_RWS_TIME_OUT_IN_MILLISECONDS } from "~/misc/generalValues";
import { getToken } from "~/services/storage"

export const apiRWS = axios.create({
  baseURL: process.env.REACT_APP_API_RWS_URL || 'https://localhost:3073/',
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
  timeout: API_RWS_TIME_OUT_IN_MILLISECONDS,
});

// Função para configurar o token JWT em cada solicitação
const setupAxiosInterceptors = () => {
  apiRWS.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};

// Configura os interceptors de solicitação com o token JWT
setupAxiosInterceptors();