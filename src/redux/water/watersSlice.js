import { createSlice } from '@reduxjs/toolkit';
import { apiAddWaterPortion } from './watersOperations';
import {
  handleFulfilledAdd,
  handleRejectedAdd,
  handlePendingAdd,
} from './handleFunctionReduser';

const initialWaterPortions = {
  waterPortionsToday: [],
  waterPortionsMonth: [],
  waterPortionsEdit: null,
  isLoading: false,
  isModalAdd: false,
  isModalEdit: false,
  error: null,
};

export const waterPortionsSlice = createSlice({
  name: 'waterPortions',
  initialState: initialWaterPortions,

  extraReducers: builder =>
    builder
      // ============= ADD WaterPortion ===============
      .addCase(apiAddWaterPortion.pending, handlePendingAdd)
      .addCase(apiAddWaterPortion.fulfilled, handleFulfilledAdd)
      .addCase(apiAddWaterPortion.rejected, handleRejectedAdd),
});
