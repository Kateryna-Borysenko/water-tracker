import { useState } from 'react';
import { TimePicker } from 'antd';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import {
  apiAddWaterPortion,
  apiEditWaterPortion,
} from '../../redux/water/watersOperations';
import { setTokenwaterPortionsInstance } from '../../redux/services/waterPortions-api';
import Subtitle from '../common/Subtitle/Subtitle';
import Button from '../../uikit/Button/Button';
import Icons from '../Icons/Icons';
import LangsSwitcher from '../../components/LangsSwitcher/LangsSwitcher';
import s from './AddAndEditWaterCard.module.css';
import { getToken } from '../../redux/auth/authSelectors';

const AddAndEditWaterCard = ({
  isEditable = false,
  waterVolume = 120,
  initialTime = '6:24 PM',
  id = '661c13d1990b4e425f6518e1',
}) => {
  const token = useSelector(getToken);
  const [defaultTime, setDefaultTime] = useState(dayjs());
  const [time, setTime] = useState(() => initialTime);
  const [water, setWater] = useState({
    counterValue: isEditable ? waterVolume : 0,
    inputValue: isEditable ? waterVolume : 0,
  });

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    if (!water) return;
    const waterVolume = water.inputValue;
    const date = dayjs(time, 'h:mm A').toISOString();
    const waterDetails = {
      waterVolume: waterVolume,
      date: date,
    };

    console.log(waterDetails);
    setTokenwaterPortionsInstance(token);
    if (!isEditable) {
      dispatch(apiAddWaterPortion({ waterVolume, date }));
    } else {
      dispatch(apiEditWaterPortion({ waterVolume, date, id }));
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

  const { t } = useTranslation();

  const title = isEditable
    ? t('AddAndEditWaterCard.titleEdit')
    : t('AddAndEditWaterCard.titleAdd');
  const subtitle = isEditable
    ? t('AddAndEditWaterCard.subtitleEdit')
    : t('AddAndEditWaterCard.subtitleAdd');

  return (
    <>
      <div className={s.infoContainer}>
        <LangsSwitcher />
        <h2 className={s.title}>{title}</h2>
        {isEditable && (
          <div className={s.glassContainer}>
            <Icons className="glassIconEdit" id={'glass'} />
            <span className={s.glassVolume}>
              {water.counterValue}
              {t('AddAndEditWaterCard.ml')}
            </span>
            <span className={s.timeGlass}>{time}</span>
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
              {water.counterValue}
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
            defaultValue={dayjs(time, 'h:mm A')}
            format="h:mm A"
            minuteStep="5"
            use12Hours="true"
            value={
              isEditable ? dayjs(time, 'h:mm A') : dayjs(defaultTime, 'h:mm A')
            }
            onChange={value =>
              isEditable
                ? setTime(dayjs(value).format('h:mm A'))
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
              {water.counterValue}
              {t('AddAndEditWaterCard.ml')}
            </span>
            <Button
              type="submit"
              title={t('AddAndEditWaterCard.saveButton')}
              className="addWaterBtn"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddAndEditWaterCard;
