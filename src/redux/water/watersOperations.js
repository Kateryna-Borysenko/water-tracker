import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addWaterPortion,
  editWaterPortion,
  deleteWaterPortion,
} from '../services/waterPortions-api';

export const apiAddWaterPortion = createAsyncThunk(
  'waterPortions/apiAddWaterPortion',
  async (waterPortionsDetails, thankApi) => {
    try {
      const response = await addWaterPortion(waterPortionsDetails);
      return response.data;
    } catch (error) {
      return thankApi.rejectWithValue(error.message);
    }
  },
);

export const apiEditWaterPortion = createAsyncThunk(
  'waterPortions/editAddWaterPortion',
  async (waterPortionsDetails, thankApi) => {
    try {
      const response = await editWaterPortion(waterPortionsDetails);
      return response.data;
    } catch (error) {
      return thankApi.rejectWithValue(error.message);
    }
  },
);

export const apiDeleteWaterPortion = createAsyncThunk(
  'waterPortions/deleteAddWaterPortion',
  async (id, thankApi) => {
    try {
      const response = await deleteWaterPortion({ id });
      return response.data;
    } catch (error) {
      return thankApi.rejectWithValue(error.message);
    }
  },
);
