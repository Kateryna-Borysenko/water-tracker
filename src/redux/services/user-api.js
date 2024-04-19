import axios from 'axios';

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const userInstance = axios.create({
  baseURL: SERVER_BASE_URL,
});

//axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`

export const setAuthorizationHeaders = token => {
  userInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const apiUpdateUserData = async userData => {
  const { data } = await userInstance.put('/users/update', {
    ...userData,
  });

  return data;
};

export const apiUpdateAvatar = async file => {
  // setAuthorizationHeaders(
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWZkMGVhZTE1MzNiOGM3YjgyMjlmNCIsImlhdCI6MTcxMzQ2NTEzMiwiZXhwIjoxNzEzNTQ3OTMyfQ.gbc5EsfehqoUGfzOuMCv8-O5p24BhfU8dX31dvwIxcM',
  // );
  // const formData = new FormData();
  // formData.append('avatar', file);
  const { data } = await userInstance.patch(
    'users/avatar',
    { file },
    // {
    // headers: { 'Content-Type': 'multipart/form-data' },
    // }
  );
  return data.avatarURL;
};

// export const apiUpdateAvatar = async file => {
//   setAuthorizationHeaders(
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWZkMGVhZTE1MzNiOGM3YjgyMjlmNCIsImlhdCI6MTcxMzQ2NTEzMiwiZXhwIjoxNzEzNTQ3OTMyfQ.gbc5EsfehqoUGfzOuMCv8-O5p24BhfU8dX31dvwIxcM',
//   );

//   const { data } = await userInstance.patch(
//     '/users/avatar',
//     { file },
//     // {
//     //   headers: {
//     //     'Content-Type': 'multipart/form-data',
//     //     // Authorization: `Bearer ${token}`, //
//     //   },
//     // }
//   );
//   console.log('DATA API', data); // не проходить запит бо req file undefined
//   return data;
// };

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
