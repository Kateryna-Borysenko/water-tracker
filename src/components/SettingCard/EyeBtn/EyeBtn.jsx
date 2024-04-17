import { useState } from 'react';
import OpenedEyeIcon from '../../../assets/static/icons/eye.svg?react';
import ClosedEyeIcon from '../../../assets/static/icons/eye-slash.svg?react';
import s from './EyeBtn.module.css';

const EyeBtn = () => {
  const [isOpenEye, setIsOpenEye] = useState(false);

  const handleToggleEye = e => {
    if (isOpenEye) {
      setIsOpenEye(false);
      e.currentTarget.previousElementSibling.type = 'password';
    }
    if (!isOpenEye) {
      setIsOpenEye(true);
      e.currentTarget.previousElementSibling.type = 'text';
    }
  };
  return (
    <>
      <button type="button" className={s.eyeBtn} onClick={handleToggleEye}>
        {!isOpenEye ? (
          <ClosedEyeIcon width="16" height="16" />
        ) : (
          <OpenedEyeIcon width="16" height="16" />
        )}
      </button>
    </>
  );
};
export default EyeBtn;
