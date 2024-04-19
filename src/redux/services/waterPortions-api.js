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

export const getMonthlyUsage = async date => {
  const response = await waterPortionsInstance.get('/monthly-data', {
    params: { date: date },
  });

  return response.data;
};
export const addWaterPortion = async waterPortionsDetails => {
  const response = await waterPortionsInstance.post(
    WATER_ENDPOINT.WATER_PORTIONS,
    waterPortionsDetails,
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
  const response = await waterPortionsInstance.put(
    `${WATER_ENDPOINT.WATER_PORTIONS}/${id}`,
  );
  return response;
};
