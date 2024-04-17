//data: user - потім вкажи що я буду повертати з бекенда !

import axios from 'axios';

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const userInstance = axios.create({
  baseURL: SERVER_BASE_URL,
});

//axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
//???  в мене такого не було в Phonebook ...
export const setAuthorizationHeaders = token => {
  userInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// export const clearTokenwaterPortionsInstance = () =>
//   (waterPortionsInstance.defaults.headers.common.Authorization = '');

export const apiUpdateUserData = async userData => {
  const { data } = await userInstance.put('/users/update', {
    ...userData,
  });

  return data;
};

//{ fd }

export const apiUpdateAvatar = async (formData, token) => {
  setAuthorizationHeaders(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWZkMGVhZTE1MzNiOGM3YjgyMjlmNCIsImlhdCI6MTcxMzM3MTQ4NywiZXhwIjoxNzEzNDU0Mjg3fQ.x3NYHgEEgZZR44P1msITIWldJD2Nx14nPWABhA6hDic',
  );
  // setAuthorizationHeaders(token);

  console.log(SERVER_BASE_URL + '/users/avatar');
  const { data } = await userInstance.patch('/users/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      // Authorization: `Bearer ${token}`, //
    },
  });
  console.log('DATA API', data); // не проходить запит бо req file undefined
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

//https://water-tracker-node-rest-api.onrender.com/api/users/avatar
