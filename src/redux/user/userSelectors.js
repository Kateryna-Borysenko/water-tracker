//avatar
export const selectUpdateAvatar = state => state.user.avatarURL;

// user data
export const selectUpdateUserData = state => state.user; //?

export const selectUserDataError = state => state.user.error;

export const selectUserDataIsLoading = state => state.user.isLoading; // а можна взяти з загального стану  і еррор теж ?
