import { useState } from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import Subtitle from '../common/Subtitle/Subtitle';
import Button from '../../uikit/Button/Button';
import Icons from '../Icons/Icons';
import s from './AddAndEditWaterCard.module.css';

const AddAndEditWaterCard = ({ isEditable = true }) => {
  const [defaultTime, setDefaultTime] = useState(dayjs());
  const [counter, setCounter] = useState(0);
  const [typing] = useState(0);
  const [isFocus, setIsFocus] = useState(false);

  const handleFocus = () => {
    setIsFocus(true);
  };
  const handleBlur = () => {
    setIsFocus(false);
  };

  const screenValue = isFocus ? typing : counter;

  const handleAmountChange = e => {
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

  const handleSubmit = e => {
    e.preventDefault();
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
        <div>
          <Subtitle title={subtitle} className="addWaterModal" />
          <h4 className={s.text}>Amount of water:</h4>
          <div className={s.btnContainer}>
            <button
              className={s.btn}
              type="button"
              name="decrement"
              aria-label="decrementWater"
              onClick={handleAmountChange}
              disabled={counter === 0}
            >
              <Icons className="iconEdit" id={'minus'} fill={'#407bff'} />
            </button>
            <span className={s.waterAmountValue}>{screenValue}ml</span>
            <button
              type="button"
              name="increment"
              className={s.btn}
              aria-label="incrementWater"
              onClick={handleAmountChange}
            >
              <Icons className="iconEdit" id={'plus'} />
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
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
            onChange={evt => handleAmountChange(evt)}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
          <div className={s.sreenContainer}>
            <span className={s.waterAmountSreen}>{screenValue}ml</span>
            <Button type="submit" title="Save" className="addWaterBtn" />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddAndEditWaterCard;
