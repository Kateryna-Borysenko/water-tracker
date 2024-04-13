import axios from 'axios';

export const apiInstance = axios.create({
  baseURL: 'https://water-tracker-node-rest-api.onrender.com/api',
});

// export const setToken = token => {
//   apiInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// export const clearToken = () => {
//   apiInstance.defaults.headers.common.Authorization = '';
// };
