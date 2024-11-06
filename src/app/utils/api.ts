import axios from 'axios';
import { API_BASE_URL } from '../../config/apiConfig'; // Asegúrate de que la ruta sea correcta

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
