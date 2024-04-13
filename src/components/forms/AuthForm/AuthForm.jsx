import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import Title from '../../common/Title/Title';
import Button from '../../../uikit/Button/Button';
import { authFormValidationSchema } from '../../../schemas/authFormValidationSchema';
import eye from '../../../assets/static/eye.svg';
import eyeSlash from '../../../assets/static/eye-slash.svg';
import s from './AuthForm.module.css';

const AuthForm = ({ type }) => {
  const initialValues = {
    email: '',
    password: '',
    repeatPassword: '',
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleSubmit = (values, { setSubmitting }) => {
    const { email, password } = values;
    console.log({ email, password });
    setSubmitting(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  return (
    <div className={s.container}>
      <Title
        title={type === 'signup' ? 'Sing Up' : 'Sing In'}
        className="authForm"
      />
      <Formik
        initialValues={initialValues}
        validationSchema={authFormValidationSchema}
        onSubmit={handleSubmit}
        validateOnBlur={true}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className={s.form}>
            <div className={s.field}>
              <label>Enter your email</label>
              <Field
                type="email"
                name="email"
                placeholder="E-mail"
                className={`${s.input} ${
                  touched.email && errors.email && s.errorInput
                }`}
              />
              <ErrorMessage name="email" component="div" className={s.error} />
            </div>

            <div className={s.field}>
              <label>Enter your password</label>
              <Field
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
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
                <img
                  src={showPassword ? eyeSlash : eye}
                  alt={showPassword ? 'Hide' : 'Show'}
                />
              </button>
            </div>

            {type === 'signup' && (
              <div className={s.field}>
                <label>Repeat password</label>
                <Field
                  type={showRepeatPassword ? 'text' : 'password'}
                  name="repeatPassword"
                  placeholder="Repeat Password"
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
                  <img
                    src={showRepeatPassword ? eyeSlash : eye}
                    alt={showRepeatPassword ? 'Hide' : 'Show'}
                  />
                </button>
              </div>
            )}
            <Button
              type="submit"
              title={type === 'signup' ? 'Sign Up' : 'Sign In'}
              disabled={isSubmitting}
              className="authButton"
            />
          </Form>
        )}
      </Formik>

      {type === 'signup' && (
        <div className={s.link}>
          <Link to="/signin">Sign In</Link>
        </div>
      )}
      {type === 'signin' && (
        <div className={s.link}>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
