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
  SETTINGS_MATCH_PASSWORD_MESSAGE,
  SETTINGS_REQUIRED_REPEAT_PASSWORD_MESSAGE,
} from '../helpers/constants';

export const settingFormValidationSchema = Yup.object().shape({
  username: Yup.string().trim().matches(USER_NAME_REGEX, USER_NAME_MESSAGE),
  email: Yup.string().trim().matches(EMAIL_REGEX, EMAIL_ERROR_MESSAGE),

  currentPassword: Yup.string()
    .trim()
    .matches(EMAIL_REGEX, PASSWORD_ERROR_MESSAGE),
  // .required(REQUIRED_OUTDATED_PASSWORD_MESSAGE),

  newPassword: Yup.string()
    .trim()
    .matches(PASSWORD_REGEX, PASSWORD_ERROR_MESSAGE),
  // .required(REQUIRED_NEW_PASSWORD_MESSAGE),

  repeatPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref('newPassword'), null], SETTINGS_MATCH_PASSWORD_MESSAGE),
  // .required(SETTINGS_REQUIRED_REPEAT_PASSWORD_MESSAGE),
});
