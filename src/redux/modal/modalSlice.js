import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpenSettingModal: false,
};

export const authSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModal(state, action) {
      state.isOpenSettingModal = action.payload;
    },
  },
});
