import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { AUTH_ENDPOINT } from '../../helpers/endpoints/authEndpoint';
import { setTokenwaterPortionsInstance } from '../services/waterPortions-api';

import { apiUpdateUserData, apiUpdateAvatar } from '../services/user-api';

const SERVER_URL = import.meta.env.VITE_SERVER_BASE_URL;

axios.defaults.baseURL = SERVER_URL;

export const setTokenAuthInstance = token =>
  (axios.defaults.headers.common.Authorization = `Bearer ${token}`);

export const clearTokenAuthInstance = () =>
  (axios.defaults.headers.common.Authorization = '');

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (credentials, ThunkAPI) => {
    try {
      const { data } = await axios.post(AUTH_ENDPOINT.REGISTER, credentials);
      toast.success(`Check your email for verification, please!`);
      return data;
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response?.data?.message);
      }
      if (error.response.status === 409) {
        toast.error(error.response?.data?.message);
      }
      return ThunkAPI.rejectWithValue(error.message);
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, ThunkAPI) => {
    try {
      const { data } = await axios.post(AUTH_ENDPOINT.LOGIN, credentials);
      toast.success(`Welcome to Water Tracker App !`);
      return data;
    } catch (error) {
      if (
        error.response.status === 500 ||
        error.response?.data?.message ===
          "Cannot read properties of null - 'verify'"
      ) {
        toast.error('Email is not verified');
      }

      if (error.response.status === 404) {
        toast.error(
          error.response?.data?.message || 'Email or password invalid',
        );
      }

      if (error.response.status === 401) {
        toast.error(
          error.response?.data?.message || 'Email or password invalid',
        );
      }
      return ThunkAPI.rejectWithValue(error.message);
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, ThunkAPI) => {
    try {
      await axios.post(AUTH_ENDPOINT.LOGOUT);
      return;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.message);
    }
  },
);

export const resendVerificationEmail = createAsyncThunk(
  'auth/resendVerificationEmail',
  async (credentials, ThunkAPI) => {
    try {
      const { data } = await axios.post(AUTH_ENDPOINT.VERIFY, credentials);
      toast.success(data.message);
      return;
    } catch (error) {
      if (error.response.status === 404) {
        toast.error('User with this email does not exist');
      }
      if (error.response.status === 400) {
        toast.error(error.response?.data?.message);
      }
      return ThunkAPI.rejectWithValue(error.message);
    }
  },
);

export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    if (!token) return thunkAPI.rejectWithValue("You don't have a token!");

    try {
      setTokenAuthInstance(token);
      setTokenwaterPortionsInstance(token);
      const { data } = await axios.get(AUTH_ENDPOINT.REFRESH);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const updateAvatar = createAsyncThunk(
  'auth/updateAvatar',

  async (file, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth.token; //
      const avatarURL = await apiUpdateAvatar(file, token);
      toast.success('Your avatar was successfully updated!');
      return avatarURL;
    } catch (error) {
      toast.error(error.response?.data?.message);
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const passwordResetInstructions = createAsyncThunk(
  'auth/passwordResetInstructions',
  async (credentials, ThunkAPI) => {
    try {
      const { data } = await axios.post(
        AUTH_ENDPOINT.RESET_PASSWORD,
        credentials,
      );
      toast.success(data.message);
      return;
    } catch (error) {
      if (error.response.status === 404) {
        toast.error('User with this email does not exist');
      }
      if (error.response.status === 400) {
        toast.error(error.response?.data?.message);
      }
      return ThunkAPI.rejectWithValue(error.message);
    }
  },
);

export const updateUserData = createAsyncThunk(
  'auth/updateUserData',
  async (userData, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth.token; //
      const { data } = await apiUpdateUserData(userData, token);
      toast.success('Your data were successfully updated!');
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message);
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const sentNewPassword = createAsyncThunk(
  'auth/sentNewPassword',
  async (credentials, ThunkAPI) => {
    try {
      const { data } = await axios.post(
        AUTH_ENDPOINT.RESET_PASSWORD,
        credentials,
      );
      toast.success(data.message);
      return;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.message);
    }
  },
);

export const sentWaterRate = createAsyncThunk(
  'auth/sentWaterRate',
  async (waterDailyNorma, ThunkAPI) => {
    try {
      const { data } = await axios.patch(
        AUTH_ENDPOINT.WATER_RATE,
        waterDailyNorma,
      );
      // toast.success(data.message);
      return data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.message);
    }
  },
);
