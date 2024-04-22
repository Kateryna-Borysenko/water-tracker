import * as Yup from 'yup';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../helpers/regexPatterns';
import { useTranslation } from 'react-i18next';

const useValidationSchema = () => {
  const { t } = useTranslation();

  const baseValidationSchema = {
    email: Yup.string()
      .matches(EMAIL_REGEX, t('EMAIL_ERROR_MESSAGE'))
      .required(t('REQUIRED_EMAIL_MESSAGE')),
    password: Yup.string()
      .matches(PASSWORD_REGEX, t('PASSWORD_ERROR_MESSAGE'))
      .required(t('REQUIRED_PASSWORD_MESSAGE')),
  };

  const signupFormSchema = Yup.object().shape({
    ...baseValidationSchema,
    repeatPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('MATCH_PASSWORD_MESSAGE'))
      .required(t('REQUIRED_REPEAT_PASSWORD_MESSAGE')),
  });

  const signinFormSchema = Yup.object().shape({
    ...baseValidationSchema,
  });

  return { signupFormSchema, signinFormSchema };
};
export default useValidationSchema;
