import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default api;

export const apiNoProxy = axios.create({
  baseURL: process.env.API_URL,
});
