import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Title from '../../common/Title/Title';
import Button from '../../../uikit/Button/Button';
import { emailFormSchema } from '../../../schemas/emailFormValidationSchema';
import { verifyResetPasswordEmail } from '../../../redux/auth/authOperations';
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
    await dispatch(verifyResetPasswordEmail({ email }));
    navigate('/');
    setSubmitting(false);
    resetForm();
  };

  const { t } = useTranslation();

  return (
    <div className={s.container}>
      <Title title={t('forgotPasswordForm.forgotPasswordTitle')} />
      <p className={s.description}>
        {t('forgotPasswordForm.forgotPasswordDescription')}
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
              <label>{t('forgotPasswordForm.forgotPasswordLabel')}</label>
              <Field
                type="email"
                name="email"
                placeholder={t('forgotPasswordForm.forgotPasswordPlaceholder')}
                className={`${s.input} ${
                  touched.email && errors.email && s.errorInput
                }`}
              />
              <ErrorMessage name="email" component="div" className={s.error} />
            </div>
            <Button
              type="submit"
              title={t('forgotPasswordForm.forgotPasswordButton')}
              disabled={isSubmitting}
              className="forgotYourPassword"
              loading={loading}
            />
          </Form>
        )}
      </Formik>

      <div className={s.linkContainer}>
        {t('forgotPasswordForm.forgotPasswordReturnTo')}
        <Link className={s.link} to="/signin">
          {t('forgotPasswordForm.forgotPasswordLinkSignIn')}
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
