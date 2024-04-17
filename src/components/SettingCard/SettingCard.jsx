import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateAvatar, updateUserData } from '../../redux/user/userOperations';
import {
  selectUpdateAvatar,
  selectUpdateUserData,
  selectUserDataIsLoading,
} from '../../redux/user/userSelectors';

import UploadingIcon from '../../assets/static/icons/uploading-2.svg?react';

import s from './SettingCard.module.css';

import avatar from '../../assets/static/testImage/default_avatar.jpeg';

import EyeBtn from './EyeBtn/EyeBtn';
import { Form, Field, useFormik } from 'formik';
import { settingFormValidationSchema } from '../../schemas/settingFormValidationSchema';
import ErrorMessage from './ErrorMessage/ErrorMessage';

//   const avatarURL = useSelector(selectUpdateAvatar);
//   const userData = useSelctor(selectUpdateUserData);
//   const isLoading = useSelector(selectUserDataIsLoading);
//   const error = useSelector(selectUserDataError);

// const onSubmit = () => {
//handleSubmit()
// };
import axios from 'axios';

const SettingCard = () => {
  const [avatar, setAvatar] = useState('');
  const dispatch = useDispatch();

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

      gender: '', //?

      username: '',
      email: '',
      currentPassword: '',
      newPassword: '',
      repeatPassword: '',
    },
    validationSchema: settingFormValidationSchema,
    onSubmit: ({ setSubmitting }) => {
      console.log(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, //values ? вже винтянула
  });

  const onChange = e => {
    let reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        // setFieldValue('image', reader.result); //
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);

    dispatch(updateAvatar(avatar))
      .unwrap(toast.success('Your avatar were successfully added!'))
      .catch(() =>
        toast.error('Something went wrong. Please try again later!'),
      );

    // console.log(values.image, 'IMAGE');

    // console.log(e.target.files[0].size);

    // if (e.target.files[0].size > 10485760) {
    // } //10 мб ;Ж чи 10000000 'You can not upload the file grater than 10 MB'

    //dispatch(updateAvatar(values.image)) // !!

    //dispatch(updateAvatar(fd)) // !!
  };

  // onChange, on Submit + запит на сервер
  // const handleEmailChange = event => {
  //   handleChange(event); //

  //надсилати лише ті поля які !== '' - бо формік повертає ВСІ поля
  // };

  const avatarURL = false;
  const testEmail = 'qwe@gmai.com';
  const testDefaultUserName = testEmail.split('@')[0];
  const defaultAvatarFirstLetter = testDefaultUserName
    .split('')[0]
    .toUpperCase();

  return (
    <div className={s.container}>
      <h2 className={s.title}>Setting</h2>

      <form onSubmit={handleSubmit}>
        <div className={s.wrapper}>
          <div className={s.leftBox}>
            <h3 className={` ${s.item} ${s.mediumText} ${s.smallMb}`}>
              Your photo
            </h3>
            {/* -----------аватар----- */}

            <div className={s.avatarWrapper}>
              <span className={s.avatar}>
                {avatarURL || avatar ? (
                  <img src={avatarURL || avatar} alt="avatar" />
                ) : (
                  <p>{defaultAvatarFirstLetter}</p>
                )}
              </span>
              {/* -----------upload a photo----- */}

              <div className={s.fileWrapper}>
                <input
                  name="avatar"
                  accept="image/*"
                  // value={values.avatar}
                  type="file"
                  id="upload"
                  className={s.visuallyHidden}
                  onChange={onChange}
                />
                <label htmlFor="upload" className={s.uploadingWrapper}>
                  <UploadingIcon className={s.uploadingIcon} />

                  <span className={s.uploadingText}>Upload a photo</span>
                </label>
              </div>
            </div>

            {/* -----------genderBox */}
            <h3 className={`${s.item} ${s.mediumText} ${s.mediumMb}`}>
              Your gender identity
            </h3>

            <div className={s.genderBox}>
              <label className={` ${s.labelContainer} ${s.smallText} `}>
                <input
                  type="radio"
                  value="female"
                  //   а як бути з цим ? value="female"
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
                  //   а як бути з цим ? value="male"
                  name="gender"
                  onChange={handleChange}
                />
                Man
                <span className={s.checkmark}></span>
              </label>
            </div>

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
