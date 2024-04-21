import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Slider } from 'antd';
import './AntD.css';

import Container from '../common/Container/Container';
import Button from '../../uikit/Button/Button';
import Icons from '../Icons/Icons';
import Modal from '../common/Modal/Modal';
import AddAndEditWaterCard from '../AddWaterModal/AddAndEditWaterCard';
import { selectInterestWaterToday } from '../../redux/water/watersSelectors';

import s from './ProgressBar.module.css';

// const currentValue = 100;
const marks = {
  0: '0%',
  50: '50%',
  100: '100%',
};

const ProgressBar = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const interestWaterToday = useSelector(selectInterestWaterToday);

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <div className={s.blockProgresBar}>
        <div>
          <p className={s.textProgresBar}>Today</p>
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
          title={'Add Water'}
          className="buttonProgresBar"
          onClick={() => {
            setIsOpenModal(true);
          }}
        >
          <Icons id={'plus-circle'} stroke={'#fff'} size={'24'} />
        </Button>
      </div>
      {isOpenModal && (
        <Modal onClose={handleCloseModal}>
          <AddAndEditWaterCard onClose={handleCloseModal} />
        </Modal>
      )}
    </>
  );
};

export default ProgressBar;
