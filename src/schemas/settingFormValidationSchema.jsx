import * as Yup from 'yup';
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  USER_NAME_REGEX,
} from '../helpers/regexPatterns';
import {
  USER_NAME_MESSAGE,
  EMAIL_ERROR_MESSAGE,
  PASSWORD_ERROR_MESSAGE,
  REQUIRED_OUTDATED_PASSWORD_MESSAGE,
  REQUIRED_NEW_PASSWORD_MESSAGE,
  REQUIRED_REPEAT_PASSWORD_MESSAGE,
  MATCH_PASSWORD_MESSAGE,
  SETTINGS_PASSWORD_ERROR_MESSAGE,
} from '../helpers/constants';

//'The field cannot include leading and trailing spaces' trim(). - трім не працює з форміком через контрольованість value чи шось таке

export const settingFormValidationSchema = Yup.object().shape(
  {
    username: Yup.string().trim().matches(USER_NAME_REGEX, USER_NAME_MESSAGE),

    email: Yup.string().trim().matches(EMAIL_REGEX, EMAIL_ERROR_MESSAGE),

    currentPassword: Yup.string()
      .trim()
      .when(['newPassword', 'repeatPassword'], {
        is: (newPassword, repeatPassword) => newPassword ?? repeatPassword,
        then: schema =>
          schema
            .required(REQUIRED_OUTDATED_PASSWORD_MESSAGE)
            .matches(PASSWORD_REGEX, SETTINGS_PASSWORD_ERROR_MESSAGE),
        // otherwise: Yup.string().notRequired(),
      }),
    //взяти значення з бека  і порівняти + вивести помилку типу Що паролі не співпадають !!!!

    newPassword: Yup.string()
      .trim()
      .when(['currentPassword', 'repeatPassword'], {
        is: (currentPassword, repeatPassword) =>
          currentPassword ?? repeatPassword,
        then: schema =>
          schema
            .required(REQUIRED_NEW_PASSWORD_MESSAGE)
            .matches(PASSWORD_REGEX, SETTINGS_PASSWORD_ERROR_MESSAGE),
        // otherwise: Yup.string().notRequired(),
      }),

    repeatPassword: Yup.string()
      .trim()
      .when(['currentPassword', 'newPassword'], {
        is: (currentPassword, newPassword) => currentPassword ?? newPassword,
        then: schema =>
          schema
            .required(REQUIRED_REPEAT_PASSWORD_MESSAGE)
            .oneOf([Yup.ref('newPassword'), null], MATCH_PASSWORD_MESSAGE),
        // otherwise: Yup.string().notRequired(),
      }),
  },
  [
    ['currentPassword', 'newPassword'],
    ['newPassword', 'repeatPassword'],
    ['currentPassword', 'repeatPassword'],
  ],
);
