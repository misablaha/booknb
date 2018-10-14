import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const get = (path, config) => axios.get(`${BASE_URL}${path}`, config);
export const post = (path, config) => axios.post(`${BASE_URL}${path}`, config);
export const put = (path, config) => axios.put(`${BASE_URL}${path}`, config);
