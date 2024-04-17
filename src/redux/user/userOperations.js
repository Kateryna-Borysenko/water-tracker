import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiUpdateUserData, apiUpdateAvatar } from '../../services/user-api';

export const updateAvatar = createAsyncThunk(
  'auth/updateAvatar',
  async (avatar, thunkApi) => {
    try {
      const fd = new FormData();
      console.log(fd); //
      fd.append('avatar', avatar);

      await apiUpdateAvatar(fd); //
      return;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const updateUserData = createAsyncThunk(
  'auth/updateUserData',
  async (_, thunkApi) => {
    try {
      await apiUpdateUserData();
      return;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
