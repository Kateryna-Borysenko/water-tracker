import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addWaterPortion,
  editWaterPortion,
  deleteWaterPortion,
  getWaterPortionToday,
} from '../services/waterPortions-api';

export const apiGetWaterPortionToday = createAsyncThunk(
  'waterPortions/apiGetWaterPortionToday',
  async (_, thankApi) => {
    try {
      const response = await getWaterPortionToday();
      return response.data;
    } catch (error) {
      return thankApi.rejectWithValue(error.message);
    }
  },
);

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
  async (id, thunkAPI) => {
    try {
      const response = await deleteWaterPortion({ id });
      return response.data[0]._id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// export const apiDeleteWaterPortion = createAsyncThunk(
//   'waterPortions/deleteAddWaterPortion',
//   async (id, thankApi) => {
//     try {
//       const response = await deleteWaterPortion({ id });
//       return response.data;
//     } catch (error) {
//       return thankApi.rejectWithValue(error.message);
//     }
//   },
// );
