import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: { name: '', email: '', avatarURL: '', token: '' },
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder;

    // *************  REGISTER  ************ //

    // **************  LOGIN  ************** //

    // ************** LOGOUT  ************** //

    // *************  AVATAR  ************* //
  },
});
