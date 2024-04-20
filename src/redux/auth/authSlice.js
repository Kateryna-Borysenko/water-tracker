import { createSlice } from '@reduxjs/toolkit';
import {
  registerUser,
  loginUser,
  logoutUser,
  setTokenAuthInstance,
  clearTokenAuthInstance,
  refreshUser,
  sentWaterRate,
} from './authOperations';
import {
  clearTokenwaterPortionsInstance,
  setTokenwaterPortionsInstance,
} from '../services/waterPortions-api';

const initialState = {
  user: {
    username: null,
    email: null,
    verify: false,
    avatarURL: null,
    gender: null,
    waterRate: null,
  },
  isLoggedIn: false,
  isRefreshing: false,
  token: '',
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      // *************  REGISTER  ************ //
      .addCase(registerUser.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.user.email = payload.email;
        state.user.verify = payload.verify;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      })

      // **************  LOGIN  ************** //
      .addCase(loginUser.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = { ...payload.user };
        state.token = payload.token;
        setTokenAuthInstance(payload.token);
        setTokenwaterPortionsInstance(payload.token);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      })

      // ************** LOGOUT  ************** //
      .addCase(logoutUser.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, () => {
        clearTokenAuthInstance();
        clearTokenwaterPortionsInstance();
        return initialState;
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      })

      // ************** REFRESH  ************** //
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.user = { ...payload.user };
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      })
      // ************** waterRate  ************** //
      .addCase(sentWaterRate.pending, state => {
        state.loading = false;
        state.error = null;
      })
      .addCase(sentWaterRate.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.waterRate = payload;
      })
      .addCase(sentWaterRate.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      });
  },
});
