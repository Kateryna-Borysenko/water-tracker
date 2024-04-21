import { useState } from 'react';
import Modal from '../../common/Modal/Modal';
import MyDailyNormaModal from '../MyDailyNormaModal/MyDailyNormaModal';
import s from './MyDailyNormaButton.module.css';

export const MyDailyNormaButton = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCloseModal = () => {
    setIsOpenModal(prevState => !prevState);
  };

  return (
    <>
      <button
        type="button"
        className={s.editButton}
        onClick={() => setIsOpenModal(prevState => !prevState)}
      >
        Edit
      </button>

      {isOpenModal && (
        <Modal onClose={handleCloseModal}>
          <MyDailyNormaModal onClose={handleCloseModal} />
        </Modal>
      )}
    </>
  );
};

export default MyDailyNormaButton;
