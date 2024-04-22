import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import Title from '../../../components/common/Title/Title';
import Subtitle from '../../../components/common/Subtitle/Subtitle';
import Button from '../../../uikit/Button/Button';
import { myDailyNormaValidationSchema } from '../../../schemas/myDailyNormaValidationSchema.js';
import s from './MyDailyNormaModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { sentWaterRate } from '../../../redux/auth/authOperations.js';
import { selectWaterRate } from '../../../redux/auth/authSelectors.js';
import { apiGetWaterPortionToday } from '../../../redux/water/watersOperations.js';

const MyDailyNormaModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const waterRate = useSelector(selectWaterRate);

  const DailyNormaL = waterRate / 1000;

  const calculateWaterAmount = values => {
    const { gender, weight, activityTime } = values;

    let formula = 0;
    const time = activityTime === '' ? 0 : parseFloat(activityTime);

    if (gender === 'For woman') {
      formula = (weight * 0.03 + time * 0.4).toFixed(1);
    } else {
      formula = (weight * 0.04 + time * 0.6).toFixed(1);
    }

    return `${formula} L`;
  };

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    const drankWater = parseFloat(values.drankWater) * 1000;

    dispatch(sentWaterRate({ waterRate: drankWater })).then(() => {
      dispatch(apiGetWaterPortionToday());

      const recommendedWater = calculateWaterAmount(values);
      toast.success(`Recommended water intake: ${recommendedWater}`, {
        style: {
          width: '300px',
          textAlign: 'center',
        },
      });

      resetForm();
      setSubmitting(false);
      onClose();
    });
  };

  return (
    <div className={s.container}>
      <div className={s.textContainer}>
        <Title title={'My daily norma'} />
      </div>
      <div className={s.modalParagraphContainer}>
        <div className={s.secondContainer}>
          <p className={s.forWoman}>
            For woman:
            <span className={s.highlight}>V=(M*0.03)+(T*0.4)</span>
          </p>
          <p>
            For man:
            <span className={s.highlight}>V=(M*0.04) + (T*0.6)</span>
          </p>
        </div>
        <p className={s.modalP}>
          <span className={s.accent}>*</span>V is the volume of the water norm
          in liters per day, M is your body weight, T is the time of active
          sports, or another type of activity commensurate in terms of loads (in
          the absence of these, you must set 0)
        </p>

        <Subtitle title={'Calculate your rate:'} />
        <Formik
          initialValues={{
            gender: 'For woman',
            weight: '',
            activityTime: '',
            drankWater: DailyNormaL,
          }}
          validationSchema={myDailyNormaValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, values, handleChange }) => (
            <Form>
              <div className={s.dailyModalForm}>
                <div className={s.forManForWoman}>
                  <label>
                    <Field
                      className={s.inputRadio}
                      type="radio"
                      name="gender"
                      value="For woman"
                      onChange={handleChange}
                    />
                    For woman
                  </label>
                  <label>
                    <Field
                      className={s.inputRadio}
                      type="radio"
                      name="gender"
                      value="For man"
                      onChange={handleChange}
                    />
                    For man
                  </label>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className={`${s.error} ${
                      touched.gender && errors.gender && s.error
                    }`}
                  />
                </div>
                <div>
                  <label className={s.weightLabel}>
                    <p className={s.aboveInputText}>
                      Your weight in kilograms:
                    </p>
                    <Field
                      className={`${s.modalInput} ${
                        touched.weight && errors.weight && s.errorInput
                      }`}
                      type="number"
                      name="weight"
                      placeholder="0"
                      min="0"
                      step="1"
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="weight"
                      component="div"
                      className={`${s.error} ${
                        touched.weight && errors.weight && s.error
                      }`}
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
                      className={`${s.modalInput} ${
                        touched.activityTime &&
                        errors.activityTime &&
                        s.errorInput
                      }`}
                      type="number"
                      name="activityTime"
                      placeholder="0"
                      min="0"
                      max="24"
                      step="1"
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="activityTime"
                      component="div"
                      className={`${s.error} ${
                        touched.activityTime && errors.activityTime && s.error
                      }`}
                    />
                  </label>
                </div>
                <div>
                  <div className={s.waterNormContainer}>
                    The required amount of water in liters per day:
                    <span className={s.waterAmount}>
                      {errors.activityTime || errors.weight || errors.gender
                        ? `${0} L`
                        : calculateWaterAmount(values)}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className={s.waterLabel}>
                  <Subtitle
                    title="Write down how much water you will drink:"
                    className="subtitleDailyNorma"
                  />

                  <Field
                    className={`${s.modalInput} ${
                      touched.drankWater && errors.drankWater && s.errorInput
                    }`}
                    type="number"
                    name="drankWater"
                    placeholder="0"
                    min="0"
                    step="0.001"
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="drankWater"
                    component="div"
                    className={`${s.error} ${
                      touched.drankWater && errors.drankWater && s.error
                    }`}
                  />
                </div>
              </div>
              <div className={s.buttonContainer}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="myDailyNormaButton"
                >
                  Save
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default MyDailyNormaModal;
