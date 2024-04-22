import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { STATUSES } from '../../helpers/constants';
import { apiGetMonthlyUsage } from './calendarOperations';
import {
  handleFulfilledAdd,
  handleRejectedAdd,
  handlePendingAdd,
} from './handleFunctionReducer';

export const initialState = {
  currentDate: moment().toISOString(),
  isVisible: false,
  selectedDate: null,
  modalData: {
    dailyNorm: '0',
    percent: '0%',
    quantity: '0',
  },
  modalPosition: { left: 0, top: 0 },
  monthlyData: [],
  status: STATUSES.idle,
  error: null,
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setCurrentDate: (state, action) => {
      state.currentDate = action.payload;
    },
    nextMonth: state => {
      const newDate = moment(state.currentDate).add(1, 'month');
      state.currentDate = newDate.toISOString();
    },
    prevMonth: state => {
      const newDate = moment(state.currentDate).subtract(1, 'month');
      state.currentDate = newDate.toISOString();
    },
    openModal: (state, action) => {
      state.isVisible = true;
      state.selectedDate = action.payload.selectedDate;
      state.modalData = action.payload.modalData;
      state.modalPosition = action.payload.position;
    },
    closeModal: state => {
      state.isVisible = false;
    },
    setPosition: (state, action) => {
      state.modalPosition = action.payload;
    },
    setModalData: (state, action) => {
      state.modalData = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(apiGetMonthlyUsage.pending, handlePendingAdd)
      .addCase(apiGetMonthlyUsage.fulfilled, handleFulfilledAdd)
      .addCase(apiGetMonthlyUsage.rejected, handleRejectedAdd),
});

export const {
  setCurrentDate,
  nextMonth,
  prevMonth,
  openModal,
  closeModal,
  setPosition,
  setModalData,
} = calendarSlice.actions;

export default calendarSlice.reducer;
