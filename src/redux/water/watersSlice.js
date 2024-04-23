import { createSlice } from '@reduxjs/toolkit';
import {
  apiAddWaterPortion,
  apiEditWaterPortion,
  apiDeleteWaterPortion,
  apiGetWaterPortionToday,
} from './watersOperations';
import {
  handlePendingGet,
  handleFulfilledGet,
  handleRejectedGet,
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
  interestWaterToday: 0,
  isLoading: false,
  error: null,
};

export const waterPortionsSlice = createSlice({
  name: 'waterPortions',
  initialState: initialWaterPortions,
  reducers: {
    logoutUserWaterAction(_, __) {
      return initialWaterPortions;
    },
  },

  extraReducers: builder =>
    builder
      // ============= GET WaterPortion Today ===============
      .addCase(apiGetWaterPortionToday.pending, handlePendingGet)
      .addCase(apiGetWaterPortionToday.fulfilled, handleFulfilledGet)
      .addCase(apiGetWaterPortionToday.rejected, handleRejectedGet)
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

export const { logoutUserWaterAction } = waterPortionsSlice.actions;
