import axios from 'axios';
import { WATER_ENDPOINT } from '../../helpers/endpoints/waterEndpoint';
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const waterPortionsInstance = axios.create({
  baseURL: SERVER_BASE_URL,
});

export const setTokenwaterPortionsInstance = token =>
  (waterPortionsInstance.defaults.headers.common.Authorization = `Bearer ${token}`);

export const clearTokenwaterPortionsInstance = () =>
  (waterPortionsInstance.defaults.headers.common.Authorization = '');

export const getWaterPortionToday = async () => {
  const response = await waterPortionsInstance.get(
    WATER_ENDPOINT.WATER_PORTIONS_TODAY,
  );

  return response;
};

export const addWaterPortion = async ({ waterVolume, date }) => {
  const response = await waterPortionsInstance.post(
    WATER_ENDPOINT.WATER_PORTIONS,
    { waterVolume, date },
  );
  return response;
};

export const editWaterPortion = async ({ waterVolume, date, id }) => {
  const response = await waterPortionsInstance.put(
    `${WATER_ENDPOINT.WATER_PORTIONS}/${id}`,
    {
      waterVolume,
      date,
    },
  );
  return response;
};

export const deleteWaterPortion = async ({ id }) => {
  const response = await waterPortionsInstance.delete(
    `${WATER_ENDPOINT.WATER_PORTIONS}/${id}`,
  );
  return response;
};

export const getMonthlyUsage = async date => {
  const reqDate = new Date(date + 'T00:00:00Z');
  const response = await waterPortionsInstance.get(
    WATER_ENDPOINT.WATER_PORTIONS_MONTH,
    {
      params: { date: reqDate },
    },
  );

  return response.data;
};
