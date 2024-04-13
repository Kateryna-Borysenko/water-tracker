import { createSlice } from '@reduxjs/toolkit';
import { updateAvatar, updateUserData } from './userOperations';

const initialState = {
  user: { name: '', email: '', avatarURL: '', token: '' },
  isLoading: false,
  error: null,
};
//token: '' токен теж треба буде?

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // -------------UPDATE USER DATA   ------------- //

      .addCase(updateUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = { ...state.user, ...action.payload }; //❓
        //   state.user = { ...state.user, action.payload};
        // state.user = action.payload; // додати до об'єкта старої дати нову
        // state.userData = action.payload.user;
      })

      // ------------- AVATAR   ------------- //
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.avatarURL = action.payload;
      })
      //
      .addMatcher(
        isAnyOf(updateAvatar.pending, updateUserData.pending),
        state => {
          state.isLoading = true;
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(updateAvatar.rejected, updateUserData.rejected),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      );
  },
});

//мені здаєтсья чи auth це лише робота з авторизацією ? а робота з аватаром вже окремо ?
