import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAvatar, updateUserData } from '../../redux/user/userOperations';
import {
  selectUpdateAvatar,
  selectUpdateUserData,
  selectUserDataIsLoading,
} from '../../redux/user/userSelectors';

import UploadingIcon from '../../assets/static/icons/uploading-2.svg?react';
// import uploadingSVG from '../../assets/static/icons/uploading.svg';

import s from './SettingCard.module.css';

import avatar from '../../assets/static/testImage/default_avatar.jpeg';
// import Button from '../../../uikit/Button/Button'; pull !

import {
  USER_NAME_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
} from '../../helpers/regexPatterns';
import EyeBtn from './EyeBtn/EyeBtn';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { settingFormValidationSchema } from '../../schemas/settingFormValidationSchema';

//formik

const SettingCard = () => {
  // useEffect(()=> {}, []) запит на отримання даних про юзера (гендер о речі те треба) - контрольована форма? підставити значення в поля!

  const initialValues = {
    //інішал вельюс  - підставити сюди дані з сервера походу
    gender: '',
    username: '',
    email: '',

    currentPassword: '',
    newPassword: '',
    repeatPassword: '',
  };

  // провалідувати на беку? що приймається лише файл jpeg pdf і тд ? але виводим картинку одразу - тоді требай валідація аваатра - формік ?

  // onSubmit={async (values) => {
  //           await new Promise((resolve) => setTimeout(resolve, 500));
  //           alert(JSON.stringify(values, null, 2));
  //         }}

  //  onSubmit={(values, { setSubmitting }) => {
  //        setTimeout(() => {
  //          alert(JSON.stringify(values, null, 2));
  //          setSubmitting(false);
  //        }, 400);
  //      }}

  const handleSubmit = (values, { setSubmitting }) => {
    const { gender, username, currentPassword, newPassword, repeatPassword } =
      values;
    console.log({
      gender,
      username,
      currentPassword,
      newPassword,
      repeatPassword,
    });
    setSubmitting(false);
    //запит на сервер тут можна? - post і put треба?? і get при завантаженні
  };
  //   const dispatch = useDispatch();

  const avatarURL = false;
  //   const avatarURL = useSelector(selectUpdateAvatar);
  //   const userData = useSelctor(selectUpdateUserData);
  //   const isLoading = useSelector(selectUserDataIsLoading);
  //   const error = useSelector(selectUserDataError);

  const testEmail = 'qwe@gmai.com';
  const testDefaultUserName = testEmail.split('@')[0];
  const defaultAvatarFirstLetter = testDefaultUserName
    .split('')[0]
    .toUpperCase();

  return (
    <div className={s.container}>
      <h2 className={s.title}>Setting</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={settingFormValidationSchema}
        onSubmit={handleSubmit}
        validateOnBlur={true}
        // validateOnChange={true}
      >
        {({ isSubmitting, errors, touched, isValid, dirty }) => (
          <Form className={s.form}>
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
                      type="file"
                      id="upload"
                      name="file"
                      className={s.visuallyHidden}
                    />
                    <label htmlFor="upload" className={s.uploadingWrapper}>
                      {/* <img src={uploadingSVG} alt="uploading-icon" /> */}
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
                    <Field
                      type="radio"
                      value="female"
                      name="gender"
                      className={s.checkbox}
                    />
                    Woman
                    <span className={s.checkmark}></span>
                  </label>

                  <label className={` ${s.labelContainer} ${s.smallText} `}>
                    <Field
                      type="radio"
                      value="male"
                      name="gender"
                      className={s.checkbox}
                    />
                    Man
                    <span className={s.checkmark}></span>
                  </label>
                </div>

                {/* <div className={s.labelInputErrWrapper}> */}
                <div className={`${s.inputWrapper} `}>
                  <label
                    htmlFor="yourName"
                    className={` ${s.item} ${s.mediumText} ${s.smallMb}`}
                  >
                    Your name
                  </label>
                  <Field
                    id="yourName"
                    type="text"
                    name="username"
                    placeholder="Name"
                    // pattern={USER_NAME_REGEX}
                    className={`${s.input}  ${
                      touched.username && errors.username && s.errorInput
                    }`}
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className={`${s.error} `}
                    // ${s.smallMb}
                  />
                </div>

                <div className={`${s.inputWrapper} `}>
                  {/* <div className={s.labelInputErrWrapper}> */}
                  <label
                    htmlFor="email"
                    className={`${s.item} ${s.mediumText} ${s.smallMb}`}
                  >
                    E-mail
                  </label>
                  <Field
                    id="email"
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    className={`${s.input} ${s.smallText} ${
                      touched.email && errors.email && s.errorInput
                    }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={s.error}
                  />
                </div>
              </div>

              <div className={s.rightBox}>
                <h3 className={`${s.item} ${s.mediumText} ${s.smallMb}`}>
                  Password
                </h3>

                {/* <div className={s.labelInputErrWrapper}> */}
                <label
                  htmlFor="currentPassword"
                  className={`${s.itemText} ${s.smallText}`}
                >
                  Outdated password:
                </label>
                <div className={`${s.inputWrapper} ${s.passwordInput}`}>
                  <Field
                    id="currentPassword"
                    type="password"
                    name="currentPassword"
                    placeholder="Password"
                    className={`${s.input} ${
                      touched.currentPassword &&
                      errors.currentPassword &&
                      s.errorInput
                    }`}
                  />
                  <EyeBtn />
                  <ErrorMessage
                    name="currentPassword"
                    component="div"
                    className={s.error}
                  />
                </div>
                {/* </div> */}

                {/* <div className={s.labelInputErrWrapper}> */}
                <label
                  htmlFor="newPassword"
                  className={` ${s.itemText} ${s.smallText}`}
                >
                  New password:
                </label>
                <div className={`${s.inputWrapper} ${s.passwordInput}`}>
                  <Field
                    id="newPassword"
                    type="password"
                    name="newPassword"
                    placeholder="Password"
                    // pattern={PASSWORD_REGEX}
                    className={`${s.input} ${
                      touched.newPassword && errors.newPassword && s.errorInput
                    } `}
                  />{' '}
                  <EyeBtn />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className={s.error}
                  />
                </div>
                {/* </div> */}

                <div className={s.labelInputErrWrapper}>
                  <label
                    htmlFor="repeatPassword"
                    className={` ${s.itemText} ${s.smallText}`}
                  >
                    Repeat new password:
                  </label>
                  <div className={`${s.inputWrapper} `}>
                    <Field
                      id="repeatPassword"
                      type="password"
                      name="repeatPassword"
                      placeholder="Password"
                      className={`${s.input} ${
                        touched.repeatPassword &&
                        errors.repeatPassword &&
                        s.errorInput
                      } `}
                    />{' '}
                    <EyeBtn />
                    <ErrorMessage
                      name="repeatPassword"
                      component="div"
                      className={s.error}
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SettingCard;
