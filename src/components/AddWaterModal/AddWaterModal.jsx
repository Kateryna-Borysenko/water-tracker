import { useState } from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import ConfigProvider from 'antd/lib/config-provider';

import Modal from '../common/Modal/Modal';
import Subtitle from '../common/Subtitle/Subtitle';

import minusIcon from '../../assets/static/minus.svg';
import plusIcon from '../../assets/static/plus.svg';

import s from './AddWaterModal.module.css';

const AddWaterModal = ({ onClose }) => {
  const [defaultTime, setDefaultTime] = useState(dayjs());
  const [amountWater, setAmountWater] = useState(0);

  const handleAmountChange = evt => {
    const { name } = evt.currentTarget;
    console.log(name);
    switch (name) {
      case 'decrement':
        setAmountWater(state => Math.max(state - 50, 0));
        break;
      case 'increment':
        setAmountWater(state => Math.min(state + 50, 5000));
        break;
      case 'value':
        const inputValue = Number(evt.target.value);
        const newInputValue = Math.min(Math.max(inputValue, 0), 5000);
        setAmountWater(newInputValue);
        break;
      default:
    }
  };

  return (
    <>
      <Modal className="addWaterModalBox" onClose={onClose}>
        <h2 className={s.title}>Add water</h2>
        <div className={s.infoContainer}>
          <div>
            <Subtitle title="Choose a value:" className="addWaterModal" />
            <p className={s.text}>Amount of water:</p>
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
                <img src={plusIcon} alt="Plus Button" />
              </button>
            </div>
          </div>

          <p className={s.text}>Recording time:</p>
          <ConfigProvider>
            <TimePicker
              className={s.test}
              defaultValue={defaultTime}
              format="h:mm"
              minuteStep="5"
              use12Hours="true"
              onChange={value => setDefaultTime(value)}
            />
          </ConfigProvider>

          <Subtitle
            title=" Enter the value of the water used:"
            className="addWaterModal"
          />
          <input
            className={s.input}
            name="value"
            type="number"
            min="1"
            max="5000"
            value={amountWater}
            onChange={evt => handleAmountChange(evt)}
          />
        </div>
        <div className={s.sreenContainer}>
          <span className={s.waterAmountSreen}>{amountWater}ml</span>
          <button>Save</button>
        </div>
      </Modal>
    </>
  );
};

export default AddWaterModal;
