import { createSelector } from 'reselect';

const selectCalendarState = state => state.calendar;
const selectUserState = state => state.auth.user;

export const selectCurrentDate = createSelector(
  [selectCalendarState],
  calendar => new Date(calendar.currentDate),
);

export const selectIsOpenModal = createSelector(
  [selectCalendarState],
  calendar => calendar.isVisible,
);

export const selectModalPosition = createSelector(
  [selectCalendarState],
  calendar => calendar.modalPosition,
);

export const selectModalData = createSelector(
  [selectCalendarState],
  calendar => calendar.modalData,
);

export const selectModalDate = createSelector(
  [selectCalendarState],
  calendar => calendar.selectedDate,
);

export const selectMonthlyData = createSelector(
  [selectCalendarState],
  calendar => calendar.monthlyData,
);

export const selectStatus = createSelector(
  [selectCalendarState],
  calendar => calendar.status,
);

export const selectError = createSelector(
  [selectCalendarState],
  calendar => calendar.error,
);

export const selectWaterRate = createSelector(
  [selectUserState],
  user => user.waterRate,
);
