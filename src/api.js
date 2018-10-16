import axios from 'axios';

const baseUrl = process.env.BASE_URL || '';

export const get = (path, config) => axios.get(`${baseUrl}${path}`, config);
export const post = (path, config) => axios.post(`${baseUrl}${path}`, config);
export const put = (path, config) => axios.put(`${baseUrl}${path}`, config);
