// ============= GET WaterPortion Today ===============
export const handlePendingGet = state => {
  state.isLoading = true;
  state.error = null;
};

export const handleFulfilledGet = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.waterPortionsToday = payload.data;
  state.interestWaterToday = payload.interest;
};

export const handleRejectedGet = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

// ============= ADD WaterPortion ===============
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

// ============= EDIT WaterPortion ===============
export const handlePendingEdit = state => {
  state.isLoading = true;
  state.error = null;
};

export const handleFulfilledEdit = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  console.log(state.waterPortionToday);
  const oldToday = state.waterPortionsToday.filter(
    waterPortion => waterPortion.id !== payload.id,
  );
  state.waterPortionsToday = [...oldToday, payload];
};

export const handleRejectedEdit = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

// ============= DELETE WaterPortion ===============
export const handlePendingDelete = state => {
  state.isLoading = true;
  state.error = null;
};

export const handleFulfilledDelete = (state, { payload }) => {
  const index = state.waterPortionsToday.findIndex(
    waterPortionToday => waterPortionToday.id === payload,
  );
  state.waterPortionsToday.splice(index, 1);
};

export const handleRejectedDelete = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};
