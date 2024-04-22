import * as Yup from 'yup';
import { EMAIL_REGEX } from '../helpers/regexPatterns';
import {
  EMAIL_ERROR_MESSAGE,
  REQUIRED_EMAIL_MESSAGE,
} from '../helpers/constants';

export const emailFormSchema = Yup.object().shape({
  email: Yup.string()
    .matches(EMAIL_REGEX, EMAIL_ERROR_MESSAGE)
    .required(REQUIRED_EMAIL_MESSAGE),
});
