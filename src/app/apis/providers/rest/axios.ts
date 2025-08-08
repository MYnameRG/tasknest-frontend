import axios from 'axios';
import CONFIG from "../../../environment/dev.env";

export const request = axios.create({
  baseURL: CONFIG.API_URL
});