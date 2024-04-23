import { useState } from 'react';
import Modal from '../../common/Modal/Modal';
import AddWaterModal from '../../AddWaterModal/AddAndEditWaterCard';
import Icons from '../../Icons/Icons';
import s from './AddWaterButton.module.css';

export const AddWaterButton = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCloseModal = () => {
    setIsOpenModal(prevState => !prevState);
  };

  return (
    <>
      <button
        className={s.addWaterBtn}
        onClick={() => setIsOpenModal(prevState => !prevState)}
      >
        <Icons id={'plus'} size={24} className={'iconPlus'} />
        Add water
      </button>

      {isOpenModal && (
        <Modal onClose={handleCloseModal}>
          <AddWaterModal
            isEditable={false}
            onClose={handleCloseModal}
          ></AddWaterModal>
        </Modal>
      )}
    </>
  );
};

export default AddWaterButton;
