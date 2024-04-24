import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import {
  updateAvatar,
  updateUserData,
} from '../../../redux/auth/authOperations';
import {
  selectUpdateUserData,
  getLoading,
  selectAvatarLoading,
} from '../../../redux/auth/authSelectors';
import { settingFormValidationSchema } from '../../../schemas/settingFormValidationSchema';
import EyeBtn from '../../EyeBtn/EyeBtn';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Button from '../../../uikit/Button/Button';
import Spinner from '../../common/Spinner/Spinner';
import UploadingIcon from '../../../assets/static/icons/uploading-2.svg?react';
import s from './SettingsForm.module.css';

const SettingsForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef();
  const [file, setFile] = useState('');
  const user = useSelector(selectUpdateUserData);
  const isLoading = useSelector(selectAvatarLoading);
  const loadingSave = useSelector(getLoading);

  //  isValid,
  //   dirty,
  //   setFieldValue,
  // isSubmitting,

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setSubmitting,
    resetForm,
  } = useFormik({
    initialValues: {
      gender: user.gender || '',
      username: user.username || '',
      email: user.email,
      password: '',
      newPassword: '',
      repeatPassword: '',
    },
    validationSchema: settingFormValidationSchema,
    onSubmit: () => {
      if (
        values.newPassword !== '' &&
        values.password === '' &&
        values.repeatPassword === ''
      ) {
        toast.error('Outdated and repeat passwords are required');
        return;
      }
      if (
        values.password !== '' &&
        values.newPassword === '' &&
        values.repeatPassword === ''
      ) {
        toast.error('New and repeat password are required');
        return;
      }
      if (values.password !== '' && values.newPassword === '') {
        toast.error('New password is required');
        return;
      }
      if (values.password === '' && values.newPassword !== '') {
        toast.error('Outdated password is required');
        return;
      }
      if (
        values.password !== '' &&
        values.newPassword !== '' &&
        values.repeatPassword === ''
      ) {
        toast.error('Repeat password is required');
        return;
      }

      const body = {};
      if (values.gender && values.gender !== user.gender) {
        body.gender = values.gender;
      }
      if (values.username && values.username !== user.username)
        body.username = values.username;
      if (values.email && values.email !== user.email)
        body.email = values.email;
      if (values.password) body.password = values.password;
      if (values.newPassword) body.newPassword = values.newPassword;

      if (values.email === '') return toast.error('Email can`t be empty');
      //чи setFieldValue  values.email = user.email

      if (Object.keys(body).length === 0) {
        toast.error('Please fill at least one field');
      } else {
        dispatch(updateUserData(body))
          .unwrap()
          .then(() => {
            //resetForm ?  чи автофіл підставляє
            // resetForm({
            //   password,
            //   newPassword,
            // });
            setSubmitting(false); //
            resetForm(); //
            onClose();
          })
          .catch(error => console.error(error));
      }
      // console.log(isSubmitting, isValid, dirty); //true true true ?
      //disabled кнопка після 1го запиту
    },
  });

  const onChange = e => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selected = files[0];
      setFile(selected);
    }
  };

  useEffect(() => {
    if (file) {
      dispatch(updateAvatar(file));
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [file, dispatch]);

  const defaultAvatarFirstLetter = user.email.split('')[0].toUpperCase();

  return (
    <div className={s.container}>
      <h2 className={s.title}>Setting</h2>
      <div className={s.scrollContainer}>
        <h3 className={` ${s.item} ${s.mediumText} ${s.smallMb} ${s.topMb}`}>
          Your photo
        </h3>
        <div className={s.avatarWrapper}>
          <div className={s.avatar}>
            {user.avatarURL && !isLoading && (
              <img src={user.avatarURL} alt="avatar" />
            )}
            {!user.avatarURL && !isLoading && <p>{defaultAvatarFirstLetter}</p>}
            {isLoading && <Spinner />}
          </div>

          <form className={s.fileForm}>
            <input
              name="file"
              accept="image/*"
              type="file"
              id="upload"
              className={`${s.visuallyHidden} ${s.uploadingBtn}`}
              onChange={onChange}
              ref={fileInputRef}
            />
            <label htmlFor="upload" className={s.uploadingWrapper}>
              <UploadingIcon className={s.uploadingIcon} />
              <span className={s.uploadingText}>Upload a photo</span>
            </label>
          </form>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={s.wrapper}>
            <div className={s.leftBox}>
              <div className={s.genderWrapper}>
                <h3 className={`${s.item} ${s.mediumText} ${s.mediumMb}`}>
                  Your gender identity
                </h3>

                <div className={s.genderBox}>
                  <label className={` ${s.labelContainer} ${s.smallText} `}>
                    <input
                      type="radio"
                      value="female"
                      name="gender"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      checked={values.gender === 'female'}
                    />
                    Woman
                    <span className={s.checkmark}></span>
                  </label>

                  <label className={` ${s.labelContainer} ${s.smallText} `}>
                    <input
                      type="radio"
                      value="male"
                      checked={values.gender === 'male'}
                      name="gender"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    Man
                    <span className={s.checkmark}></span>
                  </label>
                </div>
              </div>

              <div className={s.bottomInputWrapper}>
                <div className={`${s.inputWrapper} `}>
                  <label
                    htmlFor="username"
                    className={` ${s.item} ${s.mediumText} ${s.smallMb}`}
                  >
                    Your name
                  </label>
                  <input
                    name="username"
                    value={values.username}
                    id="username"
                    type="text"
                    placeholder="Name"
                    className={`${s.input}  ${
                      touched.username && errors.username && s.errorInput
                    }`}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    errorMessage={errors.username}
                    touched={touched.username}
                  />
                </div>

                <div className={`${s.inputWrapper} `}>
                  <label
                    htmlFor="email"
                    className={`${s.item} ${s.mediumText} ${s.smallMb}`}
                  >
                    E-mail
                  </label>
                  <input
                    value={values.email}
                    id="email"
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    className={`${s.input} ${s.smallText} ${
                      touched.email && errors.email && s.errorInput
                    }`}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    errorMessage={errors.email}
                    touched={touched.email}
                  />
                </div>
              </div>
            </div>

            <div className={s.rightBox}>
              <h3 className={`${s.item} ${s.mediumText} ${s.smallMb}`}>
                Password
              </h3>

              <label
                htmlFor="password"
                className={`${s.itemText} ${s.smallText}`}
              >
                Outdated password:
              </label>
              <div className={`${s.inputWrapper} ${s.passwordInput}`}>
                <input
                  value={values.password}
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={`${s.input} ${
                    touched.password && errors.password && s.errorInput
                  }`}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <EyeBtn />
                <ErrorMessage
                  errorMessage={errors.password}
                  touched={touched.password}
                />
              </div>

              <label
                htmlFor="newPassword"
                className={` ${s.itemText} ${s.smallText}`}
              >
                New password:
              </label>
              <div className={`${s.inputWrapper} ${s.passwordInput}`}>
                <input
                  value={values.newPassword}
                  id="newPassword"
                  type="password"
                  name="newPassword"
                  placeholder="Password"
                  className={`${s.input} ${
                    touched.newPassword && errors.newPassword && s.errorInput
                  } `}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <EyeBtn />
                <ErrorMessage
                  errorMessage={errors.newPassword}
                  touched={touched.newPassword}
                />
              </div>

              <div className={s.labelInputErrWrapper}>
                <label
                  htmlFor="repeatPassword"
                  className={` ${s.itemText} ${s.smallText}`}
                >
                  Repeat new password:
                </label>
                <div className={`${s.inputWrapper} `}>
                  <input
                    value={values.repeatPassword}
                    id="repeatPassword"
                    type="password"
                    name="repeatPassword"
                    placeholder="Password"
                    className={`${s.input} ${
                      touched.repeatPassword &&
                      errors.repeatPassword &&
                      s.errorInput
                    } `}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <EyeBtn />
                  <ErrorMessage
                    errorMessage={errors.repeatPassword}
                    touched={touched.repeatPassword}
                  />
                </div>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            title={'Save'}
            className="saveSettingsBtn"
            loading={loadingSave}
            disabled={loadingSave}
          />
        </form>
      </div>
    </div>
  );
};

export default SettingsForm;
