import axios from 'axios';

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const userInstance = axios.create({
  baseURL: SERVER_BASE_URL,
});

export const setAuthorizationHeaders = token => {
  userInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
}; //

//clear token ?

export const apiUpdateUserData = async (userData, token) => {
  setAuthorizationHeaders(token);
  const data = await userInstance.put('/users/update', {
    ...userData,
  });
  //data = {user:{ username, ...} }
  return data;
};

export const apiUpdateAvatar = async (file, token) => {
  const formData = new FormData();
  formData.append('avatarURL', file);

  setAuthorizationHeaders(token);
  const { data } = await userInstance.patch('users/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.avatarURL;
};
