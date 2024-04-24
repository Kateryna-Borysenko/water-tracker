import { createSlice } from '@reduxjs/toolkit';
import { addMonths, subMonths } from 'date-fns';
import { STATUSES } from '../../helpers/constants';
import { apiGetMonthlyUsage } from './calendarOperations';
import {
  handleFulfilledAdd,
  handleRejectedAdd,
  handlePendingAdd,
} from './handleFunctionReducer';

export const initialState = {
  currentDate: new Date().toISOString(),
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
      const newDate = addMonths(new Date(state.currentDate), 1);
      state.currentDate = newDate.toISOString();
    },
    prevMonth: state => {
      const newDate = subMonths(new Date(state.currentDate), 1);
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
    logoutUserCalendarAction(_, __) {
      return initialState;
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
  logoutUserCalendarAction,
} = calendarSlice.actions;

export default calendarSlice.reducer;
