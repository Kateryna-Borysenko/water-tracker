import { createSlice } from '@reduxjs/toolkit';
import {
  apiAddWaterPortion,
  apiEditWaterPortion,
  apiDeleteWaterPortion,
} from './watersOperations';
import {
  handleFulfilledAdd,
  handleRejectedAdd,
  handlePendingAdd,
  handlePendingEdit,
  handleFulfilledEdit,
  handleRejectedEdit,
  handleFulfilledDelete,
  handlePendingDelete,
  handleRejectedDelete,
} from './handleFunctionReduser';

const initialWaterPortions = {
  waterPortionsToday: [],
  isLoading: false,
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
      .addCase(apiAddWaterPortion.rejected, handleRejectedAdd)
      // ============= EDIT WaterPortion ===============
      .addCase(apiEditWaterPortion.pending, handlePendingEdit)
      .addCase(apiEditWaterPortion.fulfilled, handleFulfilledEdit)
      .addCase(apiEditWaterPortion.rejected, handleRejectedEdit)
      // ============= DELETE WaterPortion ===============
      .addCase(apiDeleteWaterPortion.pending, handlePendingDelete)
      .addCase(apiDeleteWaterPortion.fulfilled, handleFulfilledDelete)
      .addCase(apiDeleteWaterPortion.rejected, handleRejectedDelete),
});
