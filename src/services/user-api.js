// import { apiInstance } from './api-common';

//data: user - потім вкажи що я буду повертати з бекенда !

import axios from 'axios';

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const userInstance = axios.create({
  baseURL: SERVER_BASE_URL,
});

export const apiUpdateUserData = async userData => {
  const { data } = await userInstance.put('/users/update', {
    ...userData,
  });
  return data;
};

//{ fd }

export const apiUpdateAvatar = async fd => {
  const { data } = await userInstance.patch('/users/avatar', fd, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

// axios.patch('', fd, {
//   onUploadProgress: () => {},
//   headers: { 'Custom-Header': 'value' },
// });

//{ name, email, password }
// {
//     name,
//     email,
//     password,
//   }

//оновлення user : name, email - треба рендерити, а новий пароль просто надіслати на бек ?
