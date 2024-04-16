import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, logoutUser } from './authOperations';

const initialState = {
  user: {
    username: null,
    email: null,
    avatarURL: null,
    gender: null,
    waterRate: null,
  },
  isLoggedIn: false,
  token: '',
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //Todo: checking expirationTime
  },
  extraReducers: builder => {
    builder

      // *************  REGISTER  ************ //
      .addCase(registerUser.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.user.email = payload.email;
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
        return initialState;
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      });
  },
});
