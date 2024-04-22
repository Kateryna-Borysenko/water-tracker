import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsOpenModal,
  selectModalPosition,
  selectModalData,
  selectModalDate,
} from '../../redux/calendar/calendarSelectors';
import { closeModal } from '../../redux/calendar/calendarSlice';
import modalLeftPosition from './helpers';
import s from './Calendar.module.css';

const DaysGeneralStats = () => {
  const isVisible = useSelector(selectIsOpenModal);
  const position = useSelector(selectModalPosition);
  const data = useSelector(selectModalData);
  const selectedDate = useSelector(selectModalDate);
  const dispatch = useDispatch();
  const [modalStyle, setModalStyle] = useState({});

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.keyCode === 27) {
        dispatch(closeModal());
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      if (window.innerWidth > 1439) {
        setModalStyle({
          position: 'fixed',
          left: `${modalLeftPosition(-250, position.left)}px`,
          top: `${position.top - 210}px`,
        });
      } else if (window.innerWidth > 767) {
        setModalStyle({
          position: 'fixed',
          left: `${modalLeftPosition(-250, position.left)}px`,
          top: `${position.top - 550}px`,
        });
      } else {
        setModalStyle({
          position: 'fixed',
          left: `${window.innerWidth / 2}px`,
          top: `${position.top - 120}px`,
          transform: 'translate(-50%, -50%)',
        });
      }
    }
  }, [isVisible, position]);

  if (!isVisible) {
    return null;
  }
  const formattedDate = selectedDate
    ? moment(selectedDate).format('D, MMMM')
    : '';

  return (
    <div className={s.modalOverlay} onClick={() => dispatch(closeModal())}>
      <div
        id="modalId"
        style={modalStyle}
        className={s.modalContent}
        onClick={e => e.stopPropagation()}
      >
        <div className={s.dateModal}>{formattedDate}</div>
        <div className={s.modalMainText}>
          Daily norm:&nbsp;
          <span className={s.modalValueText}>{data.dailyNorm}</span>
        </div>
        <div>
          Fulfilment of the daily norm:&nbsp;
          <span className={s.modalValueText}>{data.percent}</span>
        </div>
        <div>
          How many servings of water:&nbsp;
          <span className={s.modalValueText}>{data.quantity}</span>
        </div>
      </div>
    </div>
  );
};

export default DaysGeneralStats;
