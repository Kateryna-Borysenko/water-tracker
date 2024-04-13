import { apiInstance } from './api-common';

//data: user - потім вкажи що я буду повертати з бекенда !

export const apiUpdateUserData = async userData => {
  const { data: user } = await apiInstance.put('/users/update', {
    ...userData,
  });
  return user;
};

export const apiUpdateAvatar = async ({ avatarURL }) => {
  const { data: user } = await apiInstance.patch('/users/avatar', {
    avatarURL,
  });

  return user;
};

//{ name, email, password }
// {
//     name,
//     email,
//     password,
//   }

//оновлення user : name, email - треба рендерити, а новий пароль просто надіслати на бек ?
