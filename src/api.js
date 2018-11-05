import axios from 'axios';

const baseUrl = process.env.BASE_URL || '';

export const get = (path, config) => axios.get(`${baseUrl}${path}`, config);
export const post = (path, data, config) => axios.post(`${baseUrl}${path}`, data, config);
export const put = (path, data, config) => axios.put(`${baseUrl}${path}`, data, config);
