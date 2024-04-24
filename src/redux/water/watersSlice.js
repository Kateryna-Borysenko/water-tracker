import { createSlice } from '@reduxjs/toolkit';
import {
  apiAddWaterPortion,
  apiEditWaterPortion,
  apiDeleteWaterPortion,
  apiGetWaterPortionToday,
} from './watersOperations';
import {
  handlePending,
  handleFulfilledGet,
  handleRejectedGet,
  handleFulfilledAdd,
  handleFulfilledEdit,
  handleFulfilledDelete,
  handleRejected,
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
      .addCase(apiGetWaterPortionToday.pending, handlePending)
      .addCase(apiGetWaterPortionToday.fulfilled, handleFulfilledGet)
      .addCase(apiGetWaterPortionToday.rejected, handleRejectedGet)
      // ============= ADD WaterPortion ===============
      .addCase(apiAddWaterPortion.pending, handlePending)
      .addCase(apiAddWaterPortion.fulfilled, handleFulfilledAdd)
      .addCase(apiAddWaterPortion.rejected, handleRejected)
      // ============= EDIT WaterPortion ===============
      .addCase(apiEditWaterPortion.pending, handlePending)
      .addCase(apiEditWaterPortion.fulfilled, handleFulfilledEdit)
      .addCase(apiEditWaterPortion.rejected, handleRejected)
      // ============= DELETE WaterPortion ===============
      .addCase(apiDeleteWaterPortion.pending, handlePending)
      .addCase(apiDeleteWaterPortion.fulfilled, handleFulfilledDelete)
      .addCase(apiDeleteWaterPortion.rejected, handleRejected),
});

export const { logoutUserWaterAction } = waterPortionsSlice.actions;
