import { useState } from 'react';
import Icons from '../../components/Icons/Icons';

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
        {!isOpenEye ? <Icons id={'eye-slash'} /> : <Icons id={'eye'} />}
      </button>
    </>
  );
};
export default EyeBtn;
