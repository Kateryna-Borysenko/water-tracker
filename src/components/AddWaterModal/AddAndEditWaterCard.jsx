import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TimePicker } from 'antd';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import {
  apiAddWaterPortion,
  apiEditWaterPortion,
  apiGetWaterPortionToday,
} from '../../redux/water/watersOperations';
import { selectWaterLoading } from '../../redux/water/watersSelectors';
import Subtitle from '../common/Subtitle/Subtitle';
import Button from '../../uikit/Button/Button';
import Icons from '../Icons/Icons';
import s from './AddAndEditWaterCard.module.css';

const AddAndEditWaterCard = ({
  isEditable,
  waterVolume,
  initialTime,
  id,
  onClose,
}) => {
  const [defaultTime, setDefaultTime] = useState(dayjs());
  const [time, setTime] = useState(initialTime);
  const [water, setWater] = useState({
    counterValue: isEditable ? waterVolume : 0,
    inputValue: isEditable ? waterVolume : 0,
  });
  const loadingWater = useSelector(selectWaterLoading);

  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    if (!water.inputValue) {
      toast.error('Please enter a valid water volume.');
      return;
    }
    const waterVolume = water.inputValue;

    if (!isEditable) {
      const isAdded = await dispatch(
        apiAddWaterPortion({
          waterVolume,
          date: dayjs(defaultTime, 'h:mm A').toISOString(),
        }),
      );
      if (isAdded.error) return toast.error(`Failed to add amount of water`);
      const isGet = await dispatch(apiGetWaterPortionToday());
      if (isGet.error)
        return toast.error(`Failed to get of water portions today`);
      onClose();
    } else {
      const isAdded = await dispatch(
        apiEditWaterPortion({
          waterVolume,
          date: dayjs(time).toISOString(),
          id,
        }),
      );
      if (isAdded.error) return toast.error(`Failed to update amount of water`);
      const isGet = await dispatch(apiGetWaterPortionToday());
      if (isGet.error)
        return toast.error(`Failed to get of water portions today`);

      onClose();
    }
  };

  const handleClick = name => {
    const plus = water.counterValue + 50;
    const minus = water.counterValue - 50;

    switch (name) {
      case 'increment':
        setWater({
          inputValue: plus,
          counterValue: plus,
        });
        break;
      case 'decrement':
        setWater({
          inputValue: minus,
          counterValue: minus,
        });
        break;
      default:
        break;
    }
  };

  const handleBlur = () => {
    setWater({ ...water, counterValue: water.inputValue });
  };

  const handleVolumeChange = ({ target }) => {
    setWater({ ...water, inputValue: parseInt(target.value, 10) });
  };

  const formatTime = dateTimeStr => {
    const date = dayjs(dateTimeStr);
    return date.format('h:mm A');
  };

  const { t } = useTranslation();

  const title = isEditable
    ? t('AddAndEditWaterCard.titleEdit')
    : t('AddAndEditWaterCard.titleAdd');
  const subtitle = isEditable
    ? t('AddAndEditWaterCard.subtitleEdit')
    : t('AddAndEditWaterCard.subtitleAdd');

  return (
    <div className={s.infoContainer}>
      <h2 className={s.title}>{title}</h2>
      <div className={s.scrollContainer}>
        {isEditable && (
          <div className={s.glassContainer}>
            <Icons className="glassIconEdit" id={'glass'} />
            <span className={s.glassVolume}>
              {isNaN(water.counterValue) ? 0 : water.counterValue}
              {t('AddAndEditWaterCard.ml')}
            </span>
            <span className={s.timeGlass}>{formatTime(time)}</span>
          </div>
        )}
        <Subtitle title={subtitle} className="addWaterModal" />
        <h4 className={s.text}>{t('AddAndEditWaterCard.amountOfWater')}</h4>
        <form onSubmit={handleSubmit}>
          <div className={s.btnContainer}>
            <button
              className={s.btn}
              type="button"
              name="decrement"
              aria-label="decrementWater"
              onClick={() => handleClick('decrement')}
              disabled={water.counterValue === 0}
            >
              <Icons className="iconEdit" id={'minus'} fill={'#407bff'} />
            </button>
            <span className={s.waterAmountValue}>
              {isNaN(water.counterValue) ? 0 : water.counterValue}
              {t('AddAndEditWaterCard.ml')}
            </span>
            <button
              type="button"
              name="increment"
              className={s.btn}
              aria-label="incrementWater"
              onClick={() => handleClick('increment')}
            >
              <Icons className="iconEdit" id={'plus'} />
            </button>
          </div>
          <label htmlFor="time" className={s.text}>
            {t('AddAndEditWaterCard.recordingTime')}
          </label>
          <TimePicker
            className={s.input}
            name="time"
            format="h:mm A"
            minuteStep="5"
            use12Hours="true"
            value={
              isEditable
                ? dayjs(formatTime(time), 'h:mm A')
                : dayjs(defaultTime, 'h:mm A')
            }
            onChange={value =>
              isEditable
                ? setTime(dayjs(value))
                : setDefaultTime(dayjs(value).format('h:mm A'))
            }
          />
          <label htmlFor="value" className={s.label}>
            {t('AddAndEditWaterCard.enterTheValue')}
          </label>
          <input
            className={s.input}
            name="value"
            type="number"
            min="1"
            max="5000"
            value={water.inputValue}
            onBlur={handleBlur}
            onChange={handleVolumeChange}
          />
          <div className={s.sreenContainer}>
            <span className={s.waterAmountSreen}>
              {isNaN(water.counterValue) ? 0 : water.counterValue}
              {t('AddAndEditWaterCard.ml')}
            </span>
            <Button
              type="submit"
              title={t('AddAndEditWaterCard.saveButton')}
              className="addWaterBtn"
              loading={loadingWater}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAndEditWaterCard;
