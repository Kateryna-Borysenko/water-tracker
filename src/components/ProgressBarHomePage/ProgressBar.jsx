import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Slider } from 'antd';
import './AntD.css';
import { useTranslation } from 'react-i18next';

import Button from '../../uikit/Button/Button';
import Icons from '../Icons/Icons';
import Modal from '../common/Modal/Modal';
import AddAndEditWaterCard from '../AddWaterModal/AddAndEditWaterCard';
import { selectInterestWaterToday } from '../../redux/water/watersSelectors';

import s from './ProgressBar.module.css';

const ProgressBar = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const interestWaterToday = useSelector(selectInterestWaterToday);
  const interestFixed = interestWaterToday.toFixed(0);

  const { t } = useTranslation();

  const marks = {
    0: '0%',
    50: '50%',
    100: interestFixed < 100 ? '100%' : `${interestFixed}%`,
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <div className={s.blockProgresBar}>
        <div>
          <p className={s.textProgresBar}>
            {t('ProgressBar.ProgressBarTitle')}
          </p>
          <Slider
            marks={Object.keys(marks).reduce((acc, key) => {
              acc[key] = (
                <span
                  className={
                    interestWaterToday === Number(key) ? 'active' : 'custom'
                  }
                >
                  {marks[key]}
                </span>
              );
              return acc;
            }, {})}
            value={interestWaterToday}
          />
        </div>

        <Button
          title={t('ProgressBar.ProgressBarButton')}
          className="buttonProgresBar"
          onClick={() => {
            setIsOpenModal(true);
          }}
        >
          <Icons id={'plus-circle'} stroke={'#fff'} size={'24'} />
        </Button>
      </div>
      {isOpenModal && (
        <Modal onClose={handleCloseModal} className="add-water">
          <AddAndEditWaterCard onClose={handleCloseModal} />
        </Modal>
      )}
    </>
  );
};

export default ProgressBar;
