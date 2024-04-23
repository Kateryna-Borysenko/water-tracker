import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import {
  selectIsOpenModal,
  selectModalPosition,
  selectModalData,
  selectModalDate,
  selectWaterRate,
} from '../../redux/calendar/calendarSelectors';
import { closeModal } from '../../redux/calendar/calendarSlice';
import s from './Calendar.module.css';

const DaysGeneralStats = () => {
  const { t } = useTranslation();
  const isVisible = useSelector(selectIsOpenModal);
  const position = useSelector(selectModalPosition);
  const data = useSelector(selectModalData);
  const waterRate = useSelector(selectWaterRate);
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
    const transform = 'translate(-50%, -50%)';
    const left = window.innerWidth / 2;
    if (isVisible) {
      if (window.innerWidth < 768) {
        setModalStyle({ ...position, transform: transform, left: left });
      } else {
        setModalStyle(position);
      }
    }
  }, [isVisible, position]);

  if (!isVisible) {
    return null;
  }
  const day = format(selectedDate, 'd');
  const month = format(selectedDate, 'MMMM');
  let dailyNormAmount = 0;
  if (data.dailyNorm === '0') {
    dailyNormAmount = waterRate / 1000;
  } else {
    dailyNormAmount = data.dailyNorm.slice(0, data.dailyNorm.length - 1);
  }

  return (
    <div className={s.modalOverlay} onClick={() => dispatch(closeModal())}>
      <div
        id="modalId"
        style={modalStyle}
        className={s.modalContent}
        onClick={e => e.stopPropagation()}
      >
        <div className={s.dateModal}>
          {day}
          {', '}
          {t(`calendar.${month}`)}
        </div>
        <div className={s.modalMainText}>
          {t('calendar.norm')}
          {':'}&nbsp;
          <span className={s.modalValueText}>
            {dailyNormAmount} {t('calendar.liter')}
          </span>
        </div>
        <div>
          {t('calendar.percent')}:&nbsp;
          <span className={s.modalValueText}>{data.percent}</span>
        </div>
        <div>
          {t('calendar.quantity')}:&nbsp;
          <span className={s.modalValueText}>{data.quantity}</span>
        </div>
      </div>
    </div>
  );
};

export default DaysGeneralStats;
