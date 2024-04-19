import moment from 'moment';
import { createSelector } from 'reselect';

const selectCalendarState = state => state.calendar;

export const selectCurrentDate = createSelector(
  [selectCalendarState],
  calendar => moment(calendar.currentDate),
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
