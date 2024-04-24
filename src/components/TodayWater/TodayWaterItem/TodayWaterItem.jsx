import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  apiDeleteWaterPortion,
  apiGetWaterPortionToday,
} from '../../../redux/water/watersOperations';
import Modal from '../../common/Modal/Modal';
import AddWaterModal from '../../AddWaterModal/AddAndEditWaterCard';
import ManagementCard from '../../ManagementCard/ManagementCard';
import Icons from '../../Icons/Icons';
import s from './TodayWaterItem.module.css';
import { selectWaterLoading } from '../../../redux/water/watersSelectors';

export const TodayWaterItem = ({ waterVolume, time, id }) => {
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

  const dispatch = useDispatch();
  const loadingWater = useSelector(selectWaterLoading);

  const handleCloseModal = () => {
    setIsOpenModalEdit(false);
    setIsOpenModalDelete(false);
  };

  const handleDeleteItem = async id => {
    const isDel = await dispatch(apiDeleteWaterPortion(id));
    if (isDel.error) return toast.error(`Failed to delete water portion`);
    const isGet = await dispatch(apiGetWaterPortionToday());
    if (isGet.error)
      return toast.error(`Failed to get of water portions today`);
    handleCloseModal();
  };

  const formatTime = dateTimeStr => {
    const date = new Date(dateTimeStr);
    return format(date, 'h:mm a');
  };

  const { t } = useTranslation();

  return (
    <>
      <li className={s.todayWaterItem}>
        <div className={s.wrapItemLeft}>
          <Icons id={'glass'} className={s.glassIcon} />
          <p className={s.textWaterAmount}>
            {waterVolume} {t('TodayWater.ml')}
          </p>
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
        <Modal onClose={handleCloseModal} className="managment-card">
          <ManagementCard
            title="Delete entry"
            description="Are you sure you want to delete the entry?"
            secondButton="Delete"
            className="alignRight"
            onClick={() => handleDeleteItem(id)}
            onClickSecondBtn={handleCloseModal}
            disabledYesBtn={loadingWater}
            loading={loadingWater}
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
            onClose={handleCloseModal}
          />
        </Modal>
      )}
    </>
  );
};

export default TodayWaterItem;
