import React, { useState } from 'react';
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

import {
  USER_NAME_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
} from '../../helpers/regexPatterns';
import EyeBtn from './EyeBtn/EyeBtn';

//formik

const SettingCard = () => {
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

      <form className={s.form}>
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

            {/* </div> */}

            {/* -----------genderBox */}
            <h3 className={`${s.item} ${s.mediumText} ${s.mediumMb}`}>
              Your gender identity
            </h3>

            <div className={s.genderBox}>
              <label className={` ${s.labelContainer} ${s.smallText} `}>
                <input
                  type="radio"
                  value="female"
                  name="gender"
                  className={s.checkbox}
                />
                Woman
                <span className={s.checkmark}></span>
              </label>

              <label className={` ${s.labelContainer} ${s.smallText} `}>
                <input
                  type="radio"
                  value="male"
                  name="gender"
                  className={s.checkbox}
                />
                Man
                <span className={s.checkmark}></span>
              </label>
            </div>

            <label
              htmlFor="yourName"
              className={` ${s.item} ${s.mediumText} ${s.smallMb}`}
            >
              Your name
            </label>
            <input
              id="yourName"
              type="text"
              name="name"
              placeholder="Name"
              pattern={USER_NAME_REGEX}
              className={`${s.input} ${s.largeMb} `}
            />

            <label
              htmlFor="email"
              className={`${s.item} ${s.mediumText} ${s.smallMb}`}
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="E-mail"
              pattern={EMAIL_REGEX}
              className={`${s.input} ${s.largeMb} ${s.smallText}`}
            />
          </div>

          {/* -----right box desk ------ */}
          <div className={s.rightBox}>
            <h3 className={`${s.item} ${s.mediumText} ${s.smallMb}`}>
              Password
            </h3>

            <label
              htmlFor="outdatedPassword"
              className={`${s.itemText} ${s.smallText}`}
            >
              Outdated password:
            </label>
            <div className={`${s.inputWrapper} ${s.passwordInput}`}>
              <input
                id="outdatedPassword"
                type="password"
                name="password"
                placeholder="Password"
                pattern={PASSWORD_REGEX}
                className={`${s.input}  `}
              />
              <EyeBtn />
            </div>

            <label
              htmlFor="newPassword"
              className={` ${s.itemText} ${s.smallText}`}
            >
              New password:
            </label>
            <div className={`${s.inputWrapper} ${s.passwordInput}`}>
              <input
                id="newPassword"
                type="password"
                name="newPassword"
                placeholder="Password"
                pattern={PASSWORD_REGEX}
                className={`${s.input} `}
              />
              <EyeBtn />
            </div>

            <label
              htmlFor="repeatPassword"
              className={` ${s.itemText} ${s.smallText}`}
            >
              Repeat new password:
            </label>
            <div className={`${s.inputWrapper} ${s.largeMb}`}>
              <input
                id="repeatPassword"
                type="password"
                name="repeatedPassword"
                placeholder="Password"
                pattern={PASSWORD_REGEX}
                className={`${s.input}  `}
              />
              <EyeBtn />
            </div>
          </div>
        </div>

        <button type="submit" aria-label="Save changes" className={s.saveBtn}>
          Save
        </button>
      </form>
    </div>
  );
};

export default SettingCard;
