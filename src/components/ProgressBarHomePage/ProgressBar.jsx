import { Slider } from 'antd';
import './AntD.css';

import Container from '../common/Container/Container';
import Button from '../../uikit/Button/Button';
import Icons from '../Icons/Icons';
import AddAndEditWaterCard from '../AddWaterModal/AddAndEditWaterCard';

import s from './ProgressBar.module.css';
import Modal from '../common/Modal/Modal';
import { useState } from 'react';

const currentValue = 50;
const marks = {
  0: '0%',
  50: '50%',
  100: '100%',
};

const ProgressBar = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <Container>
        <div className={s.blockProgresBar}>
          <div>
            <p className={s.textProgresBar}>Today</p>
            <Slider
              marks={Object.keys(marks).reduce((acc, key) => {
                acc[key] = (
                  <span
                    className={
                      currentValue === Number(key) ? 'active' : 'custom'
                    }
                  >
                    {marks[key]}
                  </span>
                );
                return acc;
              }, {})}
              value={currentValue}
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
      </Container>
      {isOpenModal && (
        <Modal onClose={handleCloseModal}>
          <AddAndEditWaterCard />
        </Modal>
      )}
    </>
  );
};

export default ProgressBar;
