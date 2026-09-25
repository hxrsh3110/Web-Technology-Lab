import axios from 'axios';

// Centralized Axios instance targeting the Express API
const API = axios.create({
  baseURL: 'http://localhost:5000/api/athletes',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000 // 5-second defensive timeout
});

export const fetchAthletes = () => API.get('/');
export const createAthlete = (athleteData) => API.post('/', athleteData);
export const deleteAthlete = (id) => API.delete(`/${id}`);

export default API;