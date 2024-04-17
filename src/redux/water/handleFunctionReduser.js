export const handlePendingAdd = state => {
  state.isLoading = true;
  state.error = null;
};

export const handleFulfilledAdd = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.waterPortionsToday.push(payload);
  state.isModalAdd = false;
};

export const handleRejectedAdd = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

export const handleFulfilledEdit = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  const oldToday = state.waterPortionsToday.filter(
    waterPortion => waterPortion._id !== payload._id,
  );
  state.waterPortionsToday = [...oldToday, payload];
};
