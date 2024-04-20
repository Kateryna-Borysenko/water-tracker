import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Field, useFormik } from 'formik';
import { toast } from 'react-toastify';
import { updateAvatar, updateUserData } from '../../redux/auth/authOperations';
import {
  getToken,
  selectUpdateAvatar,
  selectUpdateUserData,
  // selectUserDataIsLoading,
} from '../../redux/auth/authSelectors';
import { settingFormValidationSchema } from '../../schemas/settingFormValidationSchema';
import EyeBtn from './EyeBtn/EyeBtn';
import ErrorMessage from './ErrorMessage/ErrorMessage';

import UploadingIcon from '../../assets/static/icons/uploading-2.svg?react'; //

import s from './SettingCard.module.css';

const SettingCard = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(true); //-

  // const [avatar, setAvatar] = useState('');
  const dispatch = useDispatch();
  // const avatar = useSelector(selectUpdateAvatar);
  // const avatar = false;
  const user = useSelector(selectUpdateUserData);
  //   const isLoading = useSelector(selectUserDataIsLoading);
  //   const error = useSelector(selectUserDataError);
  const fileInputRef = useRef();
  const [file, setFile] = useState('');

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    isValid,
    dirty,
    setFieldValue,
    setSubmitting,
  } = useFormik({
    initialValues: {
      // image: '',
      gender: user.gender || '',
      username: user.username || '',
      email: user.email,
      currentPassword: '',
      newPassword: '',
      repeatPassword: '',
    },
    //() =>
    validationSchema: settingFormValidationSchema,
    onSubmit: () => {
      // console.log(JSON.stringify(values, null, 2));
      // setSubmitting(false);

      if (
        values.newPassword !== '' &&
        values.currentPassword === '' &&
        values.repeatPassword === ''
      ) {
        toast.error('Outdated and repeat passwords are required');
        return;
      }
      if (
        values.currentPassword !== '' &&
        values.newPassword === '' &&
        values.repeatPassword === ''
      ) {
        toast.error('New and repeat password are required');

        return;
      }
      if (values.currentPassword !== '' && values.newPassword === '') {
        toast.error('New password is required');

        return;
      }

      if (values.currentPassword === '' && values.newPassword !== '') {
        toast.error('Outdated password is required');

        return;
      }
      if (
        values.currentPassword !== '' &&
        values.newPassword !== '' &&
        repeatPassword === ''
      ) {
        toast.error('Repeat password is required');

        return;
      }
      const body = {};

      if (values.gender !== user.gender) {
        body.gender = values.gender;
      }
      if (values.username !== user.username) body.username = values.username;
      if (values.email !== user.email) body.email = values.email;
      if (values.currentPassword) body.password = values.currentPassword;
      if (values.newPassword) body.newPassword = values.newPassword;

      if (Object.keys(body).length === 0) {
        toast.error('Please fill at least one field');
      } else {
        dispatch(updateUserData(body))
          .unwrap(
            toast.success('Your data were successfully updated!'),
            //   resetForm({
            //     password,
            //     newPassword,
            //   });
            // ?
            onClose(),
            // toast.success('Your data were successfully updated!'),
          )
          .catch(error => {
            toast.error('Something went wrong. Please try again later!' + ' ');
          });
      }
      // console.log(isSubmitting, isValid, dirty); //true true true ?
      //disabled кнопка після 1го запиту
    },
  });

  // const setFileToBase = file => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setFile(reader.result);
  //   };
  // };

  const onChange = e => {
    // const file = e.target.files[0];
    // setFileToBase(file);
    // console.log(file, 'File from onChange');

    const files = e.target.files;
    if (files && files.length > 0) {
      const selected = files[0];
      setFile(selected);
    }
    // let reader = new FileReader();
    // reader.onload = () => {
    //   if (reader.readyState === 2) {
    //     // setFile(reader.result);
    //     // setFieldValue('image', reader.result); //формік
    //     // setAvatar(reader.result);
    //     dispatch(updateAvatar(reader.result))
    //       .unwrap(toast.success('Your avatar were successfully added!'))
    //       //закрити форму по успіху як??
    //       .catch(error =>
    //         toast.error('Something went wrong. Please try again later!' + ' '),
    //       );
    //   }
    // };
    // reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (file) {
      dispatch(updateAvatar(file));

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [file, dispatch]);

  // const testEmail = 'qwe@gmai.com';
  // const testDefaultUserName = testEmail.split('@')[0];

  const defaultAvatarFirstLetter = user.email.split('')[0].toUpperCase();

  return (
    <div className={s.container}>
      <h2 className={s.title}>Setting</h2>

      {/* -----------avatar----- */}
      <h3 className={` ${s.item} ${s.mediumText} ${s.smallMb}`}>Your photo</h3>
      <div className={s.avatarWrapper}>
        <div className={s.avatar}>
          {user.avatarURL ? (
            <img src={user.avatarURL} alt="avatar" />
          ) : (
            <p>{defaultAvatarFirstLetter}</p>
          )}
        </div>

        {/* -----------upload a photo----- */}
        {/* action="" */}
        <form className={s.fileForm}>
          <input
            name="file"
            accept="image/*"
            //value=file
            // value={URL.createObjectURL(file)}
            type="file"
            id="upload"
            className={s.visuallyHidden}
            onChange={onChange}
            ref={fileInputRef}
          />
          <label htmlFor="upload" className={s.uploadingWrapper}>
            <UploadingIcon className={s.uploadingIcon} />

            <span className={s.uploadingText}>Upload a photo</span>
          </label>
        </form>
      </div>

      <form onSubmit={handleSubmit} action="">
        <div className={s.wrapper}>
          {/* -----------genderBox */}

          <div className={s.leftBox}>
            {/*  */}
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
              htmlFor="currentPassword"
              className={`${s.itemText} ${s.smallText}`}
            >
              Outdated password:
            </label>
            <div className={`${s.inputWrapper} ${s.passwordInput}`}>
              <input
                value={values.currentPassword}
                id="currentPassword"
                type="password"
                name="currentPassword"
                placeholder="Password"
                className={`${s.input} ${
                  touched.currentPassword &&
                  errors.currentPassword &&
                  s.errorInput
                }`}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <EyeBtn />
              <ErrorMessage
                errorMessage={errors.currentPassword}
                touched={touched.currentPassword}
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
        <button
          type="submit"
          // disabled={isSubmitting || !isValid || !dirty}
          aria-label="Save changes"
          className={s.saveBtn}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default SettingCard;
