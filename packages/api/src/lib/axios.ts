import axios from 'axios';

const api = axios.create({
  baseURL: process.env.LAMBDA_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.LAMBDA_API_KEY,
  },
});

export default api;
