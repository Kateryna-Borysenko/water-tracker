import { STATUSES } from '../../helpers/constants';

export const handlePendingAdd = state => {
  state.isLoading = true;
  state.error = null;
  state.status = STATUSES.pending;
};

export const handleFulfilledAdd = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.status = STATUSES.success;
  state.monthlyData.push(payload);
  state.isModalAdd = false;
};

export const handleRejectedAdd = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
  state.status = STATUSES.error;
};
