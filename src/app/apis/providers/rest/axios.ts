import axios from 'axios';
import CONFIG from "../../../environment/dev.env";

export default axios.create({
  baseURL: CONFIG.API_URL
});