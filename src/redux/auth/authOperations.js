import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { AUTH_ENDPOINT } from '../../helpers/endpoints/authEndpoint';

const SERVER_URL = import.meta.env.VITE_SERVER_BASE_URL;

axios.defaults.baseURL = SERVER_URL;
axios.defaults.withCredentials = true;

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

      if (error.response.status === 401) {
        toast.error(
          error.response?.data?.message || 'Email or password invalid',
        );
      }
      return ThunkAPI.rejectWithValue(error.message);
    }
  },
);
