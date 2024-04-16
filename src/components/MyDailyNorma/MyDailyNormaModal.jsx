import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import styles from './MyDailyNormaModal.module.css';

const MyDailyNormaModal = ({ closeModal }) => {
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

  const handleKeyPress = event => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={closeModal}
      onKeyDown={handleKeyPress}
    >
      <div className={styles.modalContainer} onClick={e => e.stopPropagation()}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2 className={styles.modalNormaTitle}>My daily norma</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className={styles.closeIcon}
            onClick={closeModal}
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className={styles.modalParagraphContainer}>
          <div className={styles.secondContainer}>
            <p>
              For girl:
              <span className={styles.highlight}>V=(M*0.03) + (T*0.4)</span>
            </p>
            <p>
              For man:
              <span className={styles.highlight}>V=(M*0.04) + (T*0.6)</span>
            </p>
          </div>
          <p className={styles.modalP}>
            * V is the volume of the water norm in liters per day, M is your
            body weight, T is the time of active sports, or another type of
            activity commensurate in terms of loads (in the absence of these,
            you must set 0)
          </p>

          <h3 className={styles.modalNormaText}>Calculate your rate:</h3>
          <Formik
            initialValues={{
              gender: 'For woman',
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
                <div className={styles.dailyModalForm}>
                  <div className={styles.forManForWoman}>
                    <label>
                      <Field type="radio" name="gender" value="For woman" />
                      For woman
                    </label>
                    <label>
                      <Field type="radio" name="gender" value="For man" />
                      For man
                    </label>
                  </div>
                  <div>
                    <label>
                      <p className={styles.aboveInputText}>
                        Your weight in kilograms:
                      </p>
                      <Field
                        className={styles.modalInput}
                        type="text"
                        name="weight"
                        placeholder="0"
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      <p className={styles.aboveInputText}>
                        The time of active participation in sports or other
                        activities with a high physical. load in hours:
                      </p>
                      <Field
                        className={styles.modalInput}
                        type="text"
                        name="activityTime"
                        placeholder="0"
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      The required amount of water in liters per day:
                      <span className={styles.waterAmount}>{waterAmount}</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label>
                    <h3 className={styles.modalNormaText}>
                      Write down how much water you will drink:
                    </h3>
                    <Field
                      className={styles.modalInput}
                      type="text"
                      name="drankWater"
                      placeholder="0"
                    />
                  </label>
                </div>
                <div className={styles.divButtonModal}>
                  <button className={styles.ModalButton} type="submit">
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default MyDailyNormaModal;