export const getLoading = state => state.auth.loading;

export const getError = state => state.auth.error;

export const getUser = state => state.auth.user;

export const getLoggedInStatus = state => state.auth.isLoggedIn;

export const getToken = state => state.auth.token;

export const getRefreshingStatus = state => state.auth.isRefreshing;
//

//avatar
export const selectUpdateAvatar = state => state.auth.user.avatarURL; //

// user data
export const selectUpdateUserData = state => state.auth.user; //?
