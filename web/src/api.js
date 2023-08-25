import axios from 'axios';

const api = axios.create({
  baseURL: 'http://3.89.158.18:3001/'
});

export default api
