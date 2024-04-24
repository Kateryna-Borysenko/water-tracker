import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../../common/Modal/Modal';
import MyDailyNormaModal from '../MyDailyNormaModal/MyDailyNormaModal';
import s from './MyDailyNormaButton.module.css';

export const MyDailyNormaButton = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCloseModal = () => {
    setIsOpenModal(prevState => !prevState);
  };

  const { t } = useTranslation();

  return (
    <>
      <button
        type="button"
        className={s.editButton}
        onClick={() => {
          setIsOpenModal(prevState => !prevState);
        }}
      >
        {t('MyDailyNorma.MyDailyNormaButton')}
      </button>

      {isOpenModal && (
        <Modal onClose={handleCloseModal} className="my-daily-norma">
          <MyDailyNormaModal onClose={handleCloseModal} />
        </Modal>
      )}
    </>
  );
};

export default MyDailyNormaButton;
