import React from 'react';
import s from './SettingCard.module.css';
import {
  USER_NAME_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
} from '../../helpers/regexPatterns';

function SettingCard(props) {
  return (
    <div className={s.container}>
      <h2 className={s.title}>Setting</h2>

      {/* <form className={s.form}> */}
      <div className={s.wrapper}>
        {/* <div className={s.leftBox}> */}

        <label className={` ${s.item} ${s.mediumText} ${s.smallMb}`}>
          Your photo
        </label>
        <span clasName={s.avatar}></span>
        {/* <label htmlFor="">Upload a photo</label> */}
        <input type="file" className={s.fileInput} />
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

        <label className={` ${s.item} ${s.mediumText}`}>Your name</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          pattern={USER_NAME_REGEX}
          className={s.input}
        />

        <label className={`${s.item} ${s.mediumText}`}>E-mail</label>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          pattern={EMAIL_REGEX}
          className={s.input}
        />

        {/* -----right box desk ------ */}
        <div className={s.rightBox}>
          <h3 className={`${s.item} ${s.mediumText}`}>Password</h3>
          <label className={`${s.itemText} ${s.smallText}`}>
            Outdated password:
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            pattern={PASSWORD_REGEX}
            className={`${s.input} ${s.passwordInput}`}
          />

          <label className={` ${s.itemText} ${s.smallText}`}>
            New password:
          </label>
          <input
            type="password"
            name="newPassword"
            placeholder="Password"
            pattern={PASSWORD_REGEX}
            className={`${s.input} ${s.passwordInput}`}
          />

          <label className={` ${s.itemText} ${s.smallText}`}>
            Repeat new password:
          </label>
          <input
            type="password"
            name="repeatedPassword"
            placeholder="Password"
            pattern={PASSWORD_REGEX}
            className={`${s.input} ${s.passwordInput}`}
          />
        </div>

        <button type="submit" aria-label="Save changes" className={s.saveBtn}>
          Save
        </button>
      </div>
      {/* </form> */}
    </div>
  );
}

export default SettingCard;
