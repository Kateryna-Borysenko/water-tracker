import { useState } from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';

import Subtitle from '../common/Subtitle/Subtitle';
import Button from '../../uikit/Button/Button';

import minusIcon from '../../assets/static/minus.svg';
import plusIcon from '../../assets/static/plus.svg';
import glassIcon from '../../assets/static/bin.svg';

import s from './AddAndEditWaterCard.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddAndEditWaterCard = ({ isEditable = true }) => {
  const [defaultTime, setDefaultTime] = useState(dayjs());
  const [amountWater, setAmountWater] = useState(isEditable ? 250 : 0);

  const handleAmountChange = e => {
    const { name } = e.currentTarget;

    switch (name) {
      case 'decrement':
        setAmountWater(state => Math.max(state - 50, 0));
        break;
      case 'increment':
        setAmountWater(state => Math.min(state + 50, 5000));
        break;
      case 'value':
        const inputValue = Number(e.target.value);
        const newInputValue = Math.min(Math.max(inputValue, 0), 5000);
        setAmountWater(newInputValue);
        break;
      default:
    }
  };

  const title = isEditable ? 'Edit the entered amount of water' : 'Add water';
  const subtitle = isEditable ? 'Correct entered data:' : 'Choose a value:';

  return (
    <>
      <div className={s.infoContainer}>
        <h2 className={s.title}>{title}</h2>

        {isEditable && (
          <div className={s.glassContainer}>
            <img src={glassIcon} alt="Glass" />
            <span className={s.glassVolume}>{amountWater}ml</span>
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
              disabled={amountWater === 0}
            >
              <img src={minusIcon} alt="Minus Button" />
            </button>
            <span className={s.waterAmountValue}>{amountWater}ml</span>
            <button
              type="button"
              name="increment"
              className={s.btn}
              aria-label="incrementWater"
              onClick={handleAmountChange}
            >
              {/* <svg>
                <use href={`${svgSprite}#icon-minus`} />
              </svg> */}
              <img src={plusIcon} alt="Plus Button" />
            </button>
          </div>
        </div>
        <label className={s.text}>Recording time:</label>
        <TimePicker
          className={s.input}
          defaultValue={defaultTime}
          format="h:mm"
          minuteStep="5"
          use12Hours="true"
          onChange={value => setDefaultTime(value)}
        />
        <label className={s.label}>Enter the value of the water used:</label>
        <input
          className={s.input}
          name="value"
          type="number"
          min="1"
          max="5000"
          value={amountWater}
          onChange={evt => handleAmountChange(evt)}
        />
        <div className={s.sreenContainer}>
          <span className={s.waterAmountSreen}>{amountWater}ml</span>
          <Button title="Save" className="addWaterBtn" />
        </div>
      </div>
    </>
  );
};

export default AddAndEditWaterCard;
