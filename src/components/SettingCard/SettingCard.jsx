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

const SettingCard = () => {
  // const [avatar, setAvatar] = useState('');
  const dispatch = useDispatch();
  const avatar = useSelector(selectUpdateAvatar);
  const user = useSelector(selectUpdateUserData);
  const token = useSelector(getToken); //-
  //   const isLoading = useSelector(selectUserDataIsLoading);
  //   const error = useSelector(selectUserDataError);

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
  } = useFormik({
    initialValues: {
      // image: '',
      gender: user.gender || '',
      username: user.username || '',
      email: user.email || '',
      currentPassword: '',
      newPassword: '',
      repeatPassword: '',
    },
    validationSchema: settingFormValidationSchema,
    onSubmit: ({ setSubmitting }) => {
      console.log(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, //values ?
  });

  const onChange = e => {
    let reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        // setFieldValue('image', reader.result); //формік
        // setAvatar(reader.result);
        // dispatch(updateAvatar(reader.result))
        //   .unwrap(toast.success('Your avatar were successfully added!'))
        //   .catch(error =>
        //     toast.error('Something went wrong. Please try again later!'),
        //   );
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  // const fileInputRef = useRef();

  // useEffect(() => {
  //   if (file) {
  //     dispatch(updateAvatar(file));

  //     if (fileInputRef.current) {
  //       fileInputRef.current.value = '';
  //     }
  //   }
  // }, [file, dispatch]);

  // const onSubmit = () => {

  // };

  const testEmail = 'qwe@gmai.com';
  const testDefaultUserName = testEmail.split('@')[0];

  const defaultAvatarFirstLetter = testDefaultUserName
    .split('')[0]
    .toUpperCase();

  return (
    <div className={s.container}>
      <h2 className={s.title}>Setting</h2>

      {/* -----------avatar----- */}
      <h3 className={` ${s.item} ${s.mediumText} ${s.smallMb}`}>Your photo</h3>
      <div className={s.avatarWrapper}>
        <div className={s.avatar}>
          {avatar ? (
            <img src={avatar} alt="avatar" />
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
            // value={values.avatar}
            type="file"
            id="upload"
            className={s.visuallyHidden}
            onChange={onChange}
            // ref={fileInputRef}
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
                    //   ? value="female"
                    name="gender"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  Woman
                  <span className={s.checkmark}></span>
                </label>

                <label className={` ${s.labelContainer} ${s.smallText} `}>
                  <input
                    type="radio"
                    value="male"
                    //   ? value="male"
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
          disabled={isSubmitting || !isValid || !dirty}
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
