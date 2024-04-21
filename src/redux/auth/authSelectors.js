export const getLoading = state => state.auth.loading;

export const getError = state => state.auth.error;

export const getUser = state => state.auth.user;

export const getEmailVerificationStatus = state => state.auth.user.verify;

export const getLoggedInStatus = state => state.auth.isLoggedIn;

export const getToken = state => state.auth.token;

export const getRefreshingStatus = state => state.auth.isRefreshing;

export const selectWaterRate = state => state.auth.user.waterRate;
