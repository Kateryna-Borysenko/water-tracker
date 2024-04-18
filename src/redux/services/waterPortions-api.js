import axios from 'axios';

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const waterPortionsInstance = axios.create({
  baseURL: SERVER_BASE_URL,
});

export const setTokenwaterPortionsInstance = token =>
  (waterPortionsInstance.defaults.headers.common.Authorization = `Bearer ${token}`);

export const clearTokenwaterPortionsInstance = () =>
  (waterPortionsInstance.defaults.headers.common.Authorization = '');

export const addWaterPortion = async waterPortionDetails => {
  const waterPortion = await waterPortionsInstance.post(
    '/water-portions',
    waterPortionDetails,
  );

  return waterPortion;
};

export const getMonthlyUsage = async date => {
  const response = await waterPortionsInstance.get('/monthly-data', {
    params: { date: date },
  });

  return response.data;
};
