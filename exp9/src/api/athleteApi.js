import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL 
  ? `${import.meta.env.VITE_API_BASE_URL}/api/athletes` 
  : 'http://localhost:5000/api/athletes';

const API = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

export const fetchAthletes = () => API.get('/');
export const createAthlete = (athleteData) => API.post('/', athleteData);
export const deleteAthlete = (id) => API.delete(`/${id}`);

export default API;