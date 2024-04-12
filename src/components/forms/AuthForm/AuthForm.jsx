import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import Title from '../../common/Title/Title';
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
    <>
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
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                name="email"
                placeholder="Enter your email"
                className={`${s.input} ${
                  touched.email && errors.email && s.errorInput
                }`}
              />
              <ErrorMessage name="email" component="div" className={s.error} />
            </div>

            <div className={s.field}>
              <label htmlFor="password">Password</label>
              <Field
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
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
                <label htmlFor="repeatPassword">Repeat Password</label>
                <Field
                  type={showRepeatPassword ? 'text' : 'password'}
                  name="repeatPassword"
                  placeholder="Repeat your password"
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
            <button type="submit" disabled={isSubmitting} className={s.button}>
              {type === 'signup' ? 'Sing Up' : 'Sing In'}
            </button>
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
    </>
  );
};

export default AuthForm;
