import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Title from '../../common/Title/Title';
import Button from '../../../uikit/Button/Button';
import { passwordFormSchema } from '../../../schemas/passwordFormValidationSchema';
import { sentNewPassword } from '../../../redux/auth/authOperations';
import { getLoading } from '../../../redux/auth/authSelectors';
import Icons from '../../Icons/Icons';
import s from './NewPasswordForm.module.css';

const NewPasswordForm = () => {
  const initialValues = {
    password: '',
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(getLoading);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const { password } = values;
    await dispatch(sentNewPassword({ password }));
    navigate('/signin');
    setSubmitting(false);
    resetForm();
  };

  return (
    <div className={s.container}>
      <Title title="Forgot your Password?" />
      <Formik
        initialValues={initialValues}
        validationSchema={passwordFormSchema}
        onSubmit={handleSubmit}
        validateOnBlur={true}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className={s.form}>
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
                <Icons id={showPassword ? 'eye-slash' : 'eye'} />
              </button>
            </div>
            <Button
              type="submit"
              title="Sent New Password"
              disabled={isSubmitting}
              className="forgotYourPassword"
              loading={loading}
            />
          </Form>
        )}
      </Formik>

      <div className={s.linkContainer}>
        Return to
        <Link className={s.link} to="/signin">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default NewPasswordForm;
