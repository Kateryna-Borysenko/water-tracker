import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  registerUser,
  loginUser,
  logoutUser,
  setTokenAuthInstance,
  clearTokenAuthInstance,
  refreshUser,
  updateAvatar,
  updateUserData,
  sentWaterRate,
  verifyResetPasswordEmail,
  resetPassword,
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
  isAvatarLoading: false,
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

      // ***********  RESET PASSWORD step-1  *********** //
      .addCase(verifyResetPasswordEmail.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(verifyResetPasswordEmail.fulfilled, state => {
        state.loading = false;
      })
      .addCase(verifyResetPasswordEmail.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      })

      // ***********  RESET PASSWORD step-2  *********** //
      .addCase(resetPassword.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, state => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, { payload }) => {
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

      // **********  UPDATE USER DATA  *********** //
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload.user };
      })

      // ***********    AVATAR    ************ //
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.isAvatarLoading = false;

        state.user.avatarURL = action.payload;
      })

      // *************  WATER RATE ************* //
      .addCase(sentWaterRate.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sentWaterRate.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user.waterRate = payload.waterRate;
      })
      .addCase(sentWaterRate.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      })
      .addMatcher(
        isAnyOf(updateAvatar.pending, updateUserData.pending),
        state => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(isAnyOf(updateAvatar.pending), state => {
        state.isAvatarLoading = true;
      })
      .addMatcher(
        isAnyOf(updateAvatar.rejected, updateUserData.rejected),
        (state, action) => {
          state.loading = false;
          state.isAvatarLoading = false;
          state.error = action.payload;
        },
      );
  },
});
