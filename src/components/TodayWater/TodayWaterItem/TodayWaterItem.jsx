import { useState } from 'react';
import { format } from 'date-fns'
import Modal from '../../common/Modal/Modal';
import AddAndEditWaterCard from '../../AddWaterModal/AddAndEditWaterCard';
import ManagementCard from '../../ManagementCard/ManagementCard';
import Icons from '../../Icons/Icons'
import s from './TodayWaterItem.module.css'

const TodayWaterItem = ({ waterVolume, time }) => {

    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

    const handleCloseModal = () => {
        setIsOpenModalEdit(false);
        setIsOpenModalDelete(false)
    }

    const formatedTime = (dateTimeStr) => {
        const date = new Date(dateTimeStr);
        return format(date, 'h:mm a')
    }

    return (
        <>
        <li className={s.todayWaterItem}>
            <div className={s.wrapItemLeft}>
                <Icons id={'glass'} className={s.glassIcon} />
                <p className={s.textWaterAmount}>
                    {waterVolume} ml
                </p>
                <p className={s.textTime}>
                    {formatedTime(time)}
                </p>
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
                    onClick={() => {setIsOpenModalDelete(true)}}
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
                />
            </Modal>
        )}

        {isOpenModalEdit && (
            <Modal onClose={handleCloseModal}>
                <AddAndEditWaterCard isEditable={true}></AddAndEditWaterCard>
            </Modal>
        )}
        </>
        
    );
};

export default TodayWaterItem;