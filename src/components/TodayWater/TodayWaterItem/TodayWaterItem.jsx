import { useState } from 'react';
import { format } from 'date-fns';
import Modal from '../../common/Modal/Modal';
import AddWaterModal from '../../AddWaterModal/AddAndEditWaterCard';
import Icons from '../../Icons/Icons';
import { useTranslation } from 'react-i18next';
import s from './TodayWaterItem.module.css'


export const TodayWaterItem = ({ waterVolume, time }) => {
    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

    const handleCloseModal = () => {
        setIsOpenModalEdit(false);
        setIsOpenModalDelete(false);
    };

    const formatTime = (dateTimeStr) => {
        const date = new Date(dateTimeStr);
        return format(date, 'h:mm a');
    };

    const { t } = useTranslation();

    return (
        <>
            <li className={s.todayWaterItem}>
                <div className={s.wrapItemLeft}>
                    <Icons id={'glass'} className={s.glassIcon} />
                    <p className={s.textWaterAmount}>{waterVolume} ml</p>
                    <p className={s.textTime}>{formatTime(time)}</p>
                </div>

                <div className={s.wrapItemRight}>
                    <button className={s.pencilBtn} onClick={() => setIsOpenModalEdit(true)}>
                        <Icons id={'edit-pencil'} className={s.iconPencil} />
                    </button>

                    <button className={s.trashBtn} onClick={() => setIsOpenModalDelete(true)}>
                        <Icons id={'trash'} stroke={'#EF5050'} />
                    </button>
                </div>
            </li>

            {isOpenModalDelete && (
                <Modal onClose={handleCloseModal}>
                    <ManagementCard
                        title={t('managementCard.deleteCardTitle')}
                        description={t('managementCard.deleteCardDescription')}
                        secondButton={t('managementCard.deleteButton')}
                        className="alignRight"
                    />
                </Modal>
            )}

            {isOpenModalEdit && (
            <Modal onClose={handleCloseModal} >
                <AddWaterModal isEditable={true}></AddWaterModal>
            </Modal> 
            )}
        </>
    );
};

export default TodayWaterItem;
