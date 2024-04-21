import { useState } from 'react';
import Modal from '../../components/common/Modal/Modal';
import MyDailyNormaModal from '../MyDailyNorma/MyDailyNormaModal';
import s from './MyDailyNormaButton.module.css';
import { useDispatch } from 'react-redux';
import { sentWaterRate } from '../../redux/auth/authOperations';

export const MyDailyNormaButton = () => {
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCloseModal = () => {
    setIsOpenModal(prevState => !prevState);
  };

  return (
    <>
      <button
        type="button"
        className={s.buttonEdit}
        onClick={() => {
          setIsOpenModal(prevState => !prevState);
          dispatch(sentWaterRate({ waterRate: 1900 }));
        }}
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
