// ============= GET WaterPortion Today ===============
export const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

export const handleFulfilledGet = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.waterPortionsToday = payload.data?.length === 0 ? [] : payload.data;
  state.interestWaterToday = payload.interest;
};

export const handleRejectedGet = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
  state.waterPortionsToday = 0;
};

// ============= ADD WaterPortion ===============

export const handleFulfilledAdd = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.waterPortionsToday.push(payload);
  state.isModalAdd = false;
};

// ============= EDIT WaterPortion ===============

export const handleFulfilledEdit = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;

  const newToday = state.waterPortionsToday.map(item => {
    if (item._id === payload._id) {
      return payload;
    }
    return item;
  });

  state.waterPortionsToday = newToday;
};

// ============= DELETE WaterPortion ===============
export const handleFulfilledDelete = (state, { payload }) => {
  const index = state.waterPortionsToday.findIndex(
    waterPortionToday => waterPortionToday._id === payload,
  );
  state.waterPortionsToday.splice(index, 1);
};

export const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};
