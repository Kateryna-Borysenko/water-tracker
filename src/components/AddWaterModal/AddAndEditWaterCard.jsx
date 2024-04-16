import { useState } from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import {
  apiAddWaterPortion,
  // apiEditWaterPortion,
} from '../../redux/water/watersOperations';
import { setTokenwaterPortionsInstance } from '../../redux/services/waterPortions-api';
import Subtitle from '../common/Subtitle/Subtitle';
import Button from '../../uikit/Button/Button';
import Icons from '../Icons/Icons';
import s from './AddAndEditWaterCard.module.css';

const AddAndEditWaterCard = ({ isEditable = true }) => {
  const dispatch = useDispatch();
  const [defaultTime, setDefaultTime] = useState(dayjs());
  const [counter, setCounter] = useState(0);
  // const [typingData] = useState(0);
  const [time, setTime] = useState(new Date());
  const [isFocus, setIsFocus] = useState(false);

  // const newCounter = counter;
  // const screenValue = isFocus ? typingData : counter;

  const handleSubmit = e => {
    e.preventDefault();

    if (!counter) return;
    const waterVolume = counter;
    // const superData= new Date().toLocaleTimeString()
    const date = new Date().toISOString();
    console.log(waterVolume);
    setTokenwaterPortionsInstance(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWQ2MTE2NTkxNTE2ODFmNGVmZTgwNCIsImlhdCI6MTcxMzI3MTA2MiwiZXhwIjoxNzEzMzUzODYyfQ.FLV8XGuDmf6CRghsIqgbcGbI6mOsHLVCvh3fOM4eh_0',
    );
    if (!isEditable) {
      dispatch(apiAddWaterPortion({ waterVolume, date }));
    }
    //  dispatch(apiEditWaterPortion({ },));
  };

  const handleChangeVolume = e => {
    const { name } = e.currentTarget;

    switch (name) {
      case 'decrement':
        setCounter(state => Math.max(state - 50, 0));
        break;
      case 'increment':
        setCounter(state => Math.min(state + 50, 5000));
        break;
      case 'value':
        const inputValue = Number(e.target.value);
        const newInputValue = Math.min(Math.max(inputValue, 0), 5000);
        setCounter(newInputValue);
        break;
      default:
    }
  };

  const handleFocus = () => {
    setIsFocus(true);
  };
  const handleBlur = () => {
    setIsFocus(false);
  };

  const title = isEditable ? 'Edit the entered amount of water' : 'Add water';
  const subtitle = isEditable ? 'Correct entered data:' : 'Choose a value:';

  return (
    <>
      <div className={s.infoContainer}>
        <h2 className={s.title}>{title}</h2>
        {isEditable && (
          <div className={s.glassContainer}>
            <Icons className="glassIconEdit" id={'glass'} />
            <span className={s.glassVolume}>{counter}ml</span>
            <TimePicker
              className={s.inputGlass}
              defaultValue={defaultTime}
              format="h:mm A"
              minuteStep="5"
              use12Hours="true"
              onChange={value => setDefaultTime(value)}
            />
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
              onClick={handleChangeVolume}
              disabled={counter === 0}
            >
              <Icons className="iconEdit" id={'minus'} fill={'#407bff'} />
            </button>
            <span className={s.waterAmountValue}>{counter}ml</span>
            <button
              type="button"
              name="increment"
              className={s.btn}
              aria-label="incrementWater"
              onClick={handleChangeVolume}
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
            value={counter}
            onChange={evt => handleChangeVolume(evt)}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
          <div className={s.sreenContainer}>
            <span className={s.waterAmountSreen}>{counter}ml</span>
            <Button
              type="submit"
              title="Save"
              className="addWaterBtn"
              // onClick={handleSavePortion}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddAndEditWaterCard;
