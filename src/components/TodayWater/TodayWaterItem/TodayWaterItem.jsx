import { useState } from 'react';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { apiDeleteWaterPortion } from '../../../redux/water/watersOperations';
import Modal from '../../common/Modal/Modal';
import AddWaterModal from '../../AddWaterModal/AddAndEditWaterCard';
import ManagementCard from '../../ManagementCard/ManagementCard';
import Icons from '../../Icons/Icons';
import s from './TodayWaterItem.module.css';

export const TodayWaterItem = ({ waterVolume, time, id }) => {
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setIsOpenModalEdit(false);
    setIsOpenModalDelete(false);
  };

  const formatTime = dateTimeStr => {
    const date = new Date(dateTimeStr);
    return format(date, 'h:mm a');
  };

  return (
    <>
      <li className={s.todayWaterItem}>
        <div className={s.wrapItemLeft}>
          <Icons id={'glass'} className={s.glassIcon} />
          <p className={s.textWaterAmount}>{waterVolume} ml</p>
          <p className={s.textTime}>{formatTime(time)}</p>
        </div>

        <div className={s.wrapItemRight}>
          <button
            className={s.pencilBtn}
            onClick={() => setIsOpenModalEdit(true)}
          >
            <Icons id={'edit-pencil'} className={s.iconPencil} />
          </button>

          <button
            className={s.trashBtn}
            onClick={() => setIsOpenModalDelete(true)}
          >
            <Icons id={'trash'} stroke={'#EF5050'} />
          </button>
        </div>
      </li>

      {isOpenModalDelete && (
        <Modal onClose={handleCloseModal}>
          <ManagementCard
            title="Delete entry"
            description="Are you sure you want to delete the entry?"
            secondButton="Delete"
            className="alignRight"
            onClick={() => dispatch(apiDeleteWaterPortion(id))}
            onClickSecondBtn={handleCloseModal}
          />
        </Modal>
      )}

      {isOpenModalEdit && (
        <Modal onClose={handleCloseModal}>
          <AddWaterModal
            isEditable={true}
            waterVolume={waterVolume}
            initialTime={time}
            id={id}
          ></AddWaterModal>
        </Modal>
      )}
    </>
  );
};

export default TodayWaterItem;
