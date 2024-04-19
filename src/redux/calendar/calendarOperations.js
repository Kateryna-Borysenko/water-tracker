import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMonthlyUsage } from '../services/waterPortions-api';

export const apiGetMonthlyUsage = createAsyncThunk(
  'data/getMonthlyUsage',
  async (date, thankApi) => {
    try {
      const monthlyData = await getMonthlyUsage(date);
      return monthlyData;
    } catch (error) {
      return thankApi.rejectWithValue(error.message);
    }
  },
);
