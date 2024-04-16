import { useEffect, useState } from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import {
  apiAddWaterPortion,
  apiEditWaterPortion,
} from '../../redux/water/watersOperations';
import { setTokenwaterPortionsInstance } from '../../redux/services/waterPortions-api';
import Subtitle from '../common/Subtitle/Subtitle';
import Button from '../../uikit/Button/Button';
import Icons from '../Icons/Icons';
import s from './AddAndEditWaterCard.module.css';

const AddAndEditWaterCard = ({
  isEditable = true,
  waterVolume = 120,
  date = '2024-04-14T18:24:00.000Z',
  id = '661c13d1990b4e425f6518e1',
}) => {
  const dispatch = useDispatch();
  const [defaultTime, setDefaultTime] = useState(dayjs());
  // const [time, setTime] = useState(initialTime);
  const [water, setWater] = useState({
    counterValue: 0,
    inputValue: 50,
  });

  const handleSubmit = e => {
    e.preventDefault();

    if (!water) return;
    const waterVolume = water;
    // const superData= new Date().toLocaleTimeString()
    const date = new Date().toISOString();
    console.log(waterVolume);
    setTokenwaterPortionsInstance(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWQ2MTE2NTkxNTE2ODFmNGVmZTgwNCIsImlhdCI6MTcxMzI3MTA2MiwiZXhwIjoxNzEzMzUzODYyfQ.FLV8XGuDmf6CRghsIqgbcGbI6mOsHLVCvh3fOM4eh_0',
    );
    if (!isEditable) {
      return dispatch(apiAddWaterPortion({ waterVolume, date }));
    }

    dispatch(apiEditWaterPortion({ waterVolume, date, id }));
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
    setWater({ ...water, inputValue: +target.value });
  };

  // const handleTimeChange = newTime => {
  //   setTime(newTime);
  // };

  const title = isEditable ? 'Edit the entered amount of water' : 'Add water';
  const subtitle = isEditable ? 'Correct entered data:' : 'Choose a value:';

  return (
    <>
      <div className={s.infoContainer}>
        <h2 className={s.title}>{title}</h2>
        {isEditable && (
          <div className={s.glassContainer}>
            <Icons className="glassIconEdit" id={'glass'} />
            <span className={s.glassVolume}>{water.counterValue}ml</span>
            <span className={s.inputGlass}>{date}</span>
            {/* <TimePicker
              className={s.inputGlass}
              defaultValue={defaultTime}
              format="h:mm A"
              minuteStep="5"
              use12Hours="true"
              onChange={value => setDefaultTime(value)}
            /> */}
          </div>
        )}
        <Subtitle title={subtitle} className="addWaterModal" />
        <h4 className={s.text}>Amount of water:</h4>

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
            <span className={s.waterAmountValue}>{water.counterValue}ml</span>
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
            Recording time:
          </label>

          <TimePicker
            className={s.input}
            name="time"
            defaultValue={defaultTime}
            format="h:mm"
            minuteStep="5"
            use12Hours="true"
            onChange={value => setDefaultTime(value)}
          />

          <label htmlFor="value" className={s.label}>
            Enter the value of the water used:
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
            <span className={s.waterAmountSreen}>{water.counterValue}ml</span>
            <Button type="submit" title="Save" className="addWaterBtn" />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddAndEditWaterCard;
