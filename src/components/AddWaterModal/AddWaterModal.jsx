import Modal from '../common/Modal/Modal';
import Subtitle from '../common/Subtitle/Subtitle';

import minusIcon from '../../assets/static/minus.svg';
import plusIcon from '../../assets/static/plus.svg';

import s from './AddWaterModal.module.css';

const AddWaterModal = ({
  amountWater = 0,
  manualAmountWater = 250,
  recordedTime = 0,
}) => {
  return (
    <>
      <Modal>
        <div className={s.infoContainer}>
          <h2 className={s.title}>Add water</h2>
          <Subtitle title="Choose a value:" className="red" />
          <p className={s.text}>Amount of water:</p>
          <div className={s.btnContainer}>
            <button
              type="button"
              name="minus"
              className={s.btn}
              aria-label="decrementWater"
            >
              <img src={minusIcon} alt="Minus Button" />
            </button>
            <span className="water-amount-value">{amountWater} ml</span>
            <button type="button" className={s.btn} aria-label="incrementWater">
              <img src={plusIcon} alt="Plus Button" />
            </button>
          </div>
          <div>
            <label className={s.textLabel}>Recording time:</label>
            <input type="time" value={recordedTime} />
            <label className={s.titleLabel}>
              Enter the value of the water used:
            </label>
            <input
              name="value"
              type="number"
              min="1"
              max="5000"
              value={manualAmountWater}
            />
          </div>
        </div>
      </Modal>
      <div>
        <span className="water-amount-value-screen">{amountWater}ml</span>
        <button>Save</button>
      </div>
    </>
  );
};

export default AddWaterModal;
