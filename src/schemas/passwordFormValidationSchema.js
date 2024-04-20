import * as Yup from 'yup';
import { PASSWORD_REGEX } from '../helpers/regexPatterns';
import {
  PASSWORD_ERROR_MESSAGE,
  REQUIRED_PASSWORD_MESSAGE,
} from '../helpers/constants';

export const passwordFormSchema = Yup.object().shape({
  password: Yup.string()
    .matches(PASSWORD_REGEX, PASSWORD_ERROR_MESSAGE)
    .required(REQUIRED_PASSWORD_MESSAGE),
});
