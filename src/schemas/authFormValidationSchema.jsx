import * as Yup from 'yup';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../helpers/regexPatterns';
import {
  EMAIL_ERROR_MESSAGE,
  PASSWORD_ERROR_MESSAGE,
  REQUIRED_EMAIL_MESSAGE,
  REQUIRED_PASSWORD_MESSAGE,
  MATCH_PASSWORD_MESSAGE,
  REQUIRED_REPEAT_PASSWORD_MESSAGE,
} from '../helpers/constants';

const baseValidationSchema = {
  email: Yup.string()
    .matches(EMAIL_REGEX, EMAIL_ERROR_MESSAGE)
    .required(REQUIRED_EMAIL_MESSAGE),
  password: Yup.string()
    .matches(PASSWORD_REGEX, PASSWORD_ERROR_MESSAGE)
    .required(REQUIRED_PASSWORD_MESSAGE),
};

export const signupFormSchema = Yup.object().shape({
  ...baseValidationSchema,
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], MATCH_PASSWORD_MESSAGE)
    .required(REQUIRED_REPEAT_PASSWORD_MESSAGE),
});

export const signinFormSchema = Yup.object().shape({
  ...baseValidationSchema,
});
