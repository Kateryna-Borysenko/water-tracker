import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Title from '../../common/Title/Title';
import Button from '../../../uikit/Button/Button';
import {
  registerUser,
  loginUser,
  resendVerificationEmail,
} from '../../../redux/auth/authOperations';
import {
  getLoading,
  getUser,
  getEmailVerificationStatus,
} from '../../../redux/auth/authSelectors';
import Icons from '../../Icons/Icons';
import s from './AuthForm.module.css';
import { useTranslation } from 'react-i18next';
import useValidationSchema from '../../../schemas/authFormValidationSchema';

const AuthForm = ({ type }) => {
  const { t } = useTranslation();
  const { signupFormSchema, signinFormSchema } = useValidationSchema();

  const initialValues = {
    email: '',
    password: '',
    repeatPassword: '',
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(getLoading);
  const user = useSelector(getUser);
  const email = user.email;
  const emailVerificationStatus = useSelector(getEmailVerificationStatus);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const { email, password } = values;

    if (type === 'signup') {
      const isSignup = await dispatch(registerUser({ email, password }));
      if (isSignup.error) return;
      navigate('/signin');
    }

    if (type === 'signin') {
      const isLogged = await dispatch(loginUser({ email, password }));
      if (isLogged.error) return;
      navigate('/home');
    }

    setSubmitting(false);
    resetForm();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const handleResendEmail = () => {
    dispatch(resendVerificationEmail({ email }));
  };

  return (
    <div className={s.container}>
      <Title
        title={
          type === 'signup'
            ? t('authForm.signupTitle')
            : t('authForm.signinTitle')
        }
        className="authForm"
      />
      <Formik
        initialValues={initialValues}
        validationSchema={
          type === 'signup' ? signupFormSchema : signinFormSchema
        }
        onSubmit={handleSubmit}
        validateOnBlur={true}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className={s.form}>
            <div className={s.field}>
              <label>{t('authForm.email')}</label>
              <Field
                type="email"
                name="email"
                placeholder={t('authForm.emailPlaceholder')}
                className={`${s.input} ${
                  touched.email && errors.email && s.errorInput
                }`}
              />
              <ErrorMessage name="email" component="div" className={s.error} />
            </div>
            <div className={s.field}>
              <label>{t('authForm.password')}</label>
              <Field
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder={t('authForm.passPlaceholder')}
                className={`${s.input} ${
                  touched.password && errors.password && s.errorInput
                }`}
              />
              <ErrorMessage
                name="password"
                component="div"
                className={s.error}
              />

              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={s.eyeButton}
              >
                <Icons id={showPassword ? 'eye-slash' : 'eye'} />
              </button>
            </div>
            {type === 'signup' && (
              <div className={s.field}>
                <label>{t('authForm.repeatePass')}</label>
                <Field
                  type={showRepeatPassword ? 'text' : 'password'}
                  name="repeatPassword"
                  placeholder={t('authForm.repeatePass')}
                  className={`${s.input} ${
                    touched.repeatPassword &&
                    errors.repeatPassword &&
                    s.errorInput
                  }`}
                />
                <ErrorMessage
                  name="repeatPassword"
                  component="div"
                  className={s.error}
                />

                <button
                  type="button"
                  onClick={toggleRepeatPasswordVisibility}
                  className={s.eyeButton}
                >
                  <Icons id={showRepeatPassword ? 'eye-slash' : 'eye'} />
                </button>
              </div>
            )}
            <Button
              type="submit"
              title={
                type === 'signup'
                  ? t('authForm.signupBtnTitle')
                  : t('authForm.signinBtnTitle')
              }
              disabled={isSubmitting}
              className="authButton"
              loading={loading}
            />
          </Form>
        )}
      </Formik>

      {type === 'signup' && (
        <div className={s.link}>
          <Link to="/signin">{t('authForm.signinLink')}</Link>
        </div>
      )}

      {type === 'signin' && (
        <div>
          <div className={s.linkContainer}>
            <Link className={s.link} to="/signup">
              {t('authForm.signupLink')}
            </Link>
            <Link className={s.password} to="/new-password/email">
              {t('authForm.forgotPass')}
            </Link>
          </div>
          {email && emailVerificationStatus === false && (
            <div className={s.resendEmailMassage}>
              {t('authForm.resendEmailMassage')}
              <button
                className={s.resendEmailButton}
                onClick={handleResendEmail}
                type="submit"
              >
                {t('authForm.resendEmailButton')}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AuthForm;
