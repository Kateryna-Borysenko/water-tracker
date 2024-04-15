export const getLoading = state => state.auth.loading;

export const getError = state => state.auth.error;

export const getUser = state => state.auth.user;

export const getLoggedInStatus = state => state.auth.user.isLoggedIn;

export const getToken = state => state.auth.token;
