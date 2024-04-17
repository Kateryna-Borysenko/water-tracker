import { createAsyncThunk } from '@reduxjs/toolkit';
import { addWaterPortion } from '../services/waterPortions-api';

export const apiAddWaterPortion = createAsyncThunk(
  'waterPortions/apiAddWaterPortion',
  async (waterPortionDetails, thankApi) => {
    try {
      const waterPortion = await addWaterPortion(waterPortionDetails);
      return waterPortion.data;
    } catch (error) {
      return thankApi.rejectWithValue(error.message);
    }
  },
);
