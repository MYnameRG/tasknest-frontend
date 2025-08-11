import axios from 'axios';
import CONFIG from "../../../environment/dev.env";

export const request = axios.create({
  baseURL: CONFIG.API_URL
});

export const requestInterceptor = request.interceptors.request;

export const responseInterceptor = request.interceptors.request;