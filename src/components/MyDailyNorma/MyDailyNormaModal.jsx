import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Title from '../common/Title/Title';
import Subtitle from '../common/Subtitle/Subtitle';
import Button from '../../uikit/Button/Button';
import s from './MyDailyNormaModal.module.css';

const MyDailyNormaModal = () => {
  const [waterAmount, setWaterAmount] = useState('');

  const calculateWaterAmount = values => {
    const { gender, weight, activityTime } = values;
    let formula = 0;

    if (gender === 'For woman') {
      formula = (weight * 0.03 + activityTime * 0.4).toFixed(2);
    } else {
      formula = (weight * 0.04 + activityTime * 0.6).toFixed(2);
    }

    setWaterAmount(`${formula} L`);
  };

  return (
    <div className={s.container}>
      <div className={s.textContainer}>
        <Title title={'My daily norma'} />
      </div>
      <div className={s.modalParagraphContainer}>
        <div className={s.secondContainer}>
          <p>
            For girl:
            <span className={s.highlight}>V=(M*0.03) + (T*0.4)</span>
          </p>
          <p>
            For man:
            <span className={s.highlight}>V=(M*0.04) + (T*0.6)</span>
          </p>
        </div>
        <p className={s.modalP}>
          * V is the volume of the water norm in liters per day, M is your body
          weight, T is the time of active sports, or another type of activity
          commensurate in terms of loads (in the absence of these, you must set
          0)
        </p>

        <Subtitle
          title={'Calculate your rate:'}
          className={'subtitleDailyNorma'}
        />
        <Formik
          initialValues={{
            gender: '',
            weight: '',
            activityTime: '',
            drankWater: '',
          }}
          onSubmit={values => {
            calculateWaterAmount(values);
          }}
        >
          {({ values, handleChange }) => (
            <Form>
              <div className={s.dailyModalForm}>
                <div className={s.forManForWoman}>
                  <label>
                    <Field
                      className={s.inputRadio}
                      type="radio"
                      name="gender"
                      value="For woman"
                    />
                    For woman
                  </label>
                  <label>
                    <Field
                      className={s.inputRadio}
                      type="radio"
                      name="gender"
                      value="For man"
                    />
                    For man
                  </label>
                </div>
                <div>
                  <label>
                    <p className={s.aboveInputText}>
                      Your weight in kilograms:
                    </p>
                    <Field
                      className={s.modalInput}
                      type="text"
                      name="weight"
                      placeholder="0"
                    />
                  </label>
                </div>
                <div>
                  <label>
                    <p className={s.aboveInputText}>
                      The time of active participation in sports or other
                      activities with a high physical. load in hours:
                    </p>
                    <Field
                      className={s.modalInput}
                      type="text"
                      name="activityTime"
                      placeholder="0"
                    />
                  </label>
                </div>
                <div>
                  <label>
                    The required amount of water in liters per day:
                    <span className={s.waterAmount}>{waterAmount}</span>
                  </label>
                </div>
              </div>
              <div>
                <label>
                  <Subtitle
                    title={'Write down how much water you will drink:'}
                    className={'subtitleDailyNorma'}
                  />
                  <Field
                    className={s.modalInput}
                    type="text"
                    name="drankWater"
                    placeholder="0"
                  />
                </label>
              </div>
              <Button className={'myDailyNormaSaveButton'}>Save</Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default MyDailyNormaModal;
