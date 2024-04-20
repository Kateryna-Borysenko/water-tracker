import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Title from '../../common/Title/Title';
import Button from '../../../uikit/Button/Button';
import { emailFormSchema } from '../../../schemas/emailFormValidationSchema';
import { passwordResetInstructions } from '../../../redux/auth/authOperations';
import { getLoading } from '../../../redux/auth/authSelectors';
import s from './ForgotPasswordForm.module.css';

const ForgotPasswordForm = () => {
  const initialValues = {
    email: '',
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(getLoading);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const { email } = values;
    await dispatch(passwordResetInstructions({ email }));
    navigate('/');
    setSubmitting(false);
    resetForm();
  };

  return (
    <div className={s.container}>
      <Title title="Forgot your Password?" />
      <p className={s.description}>
        Password reset instructions will be sent to your primary email address.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={emailFormSchema}
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
            <Button
              type="submit"
              title="Email Reset Instructions"
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

export default ForgotPasswordForm;
