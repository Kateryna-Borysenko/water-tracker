import * as Yup from 'yup';
import {
  REQUIRED_MESSAGE,
  MINIMUM_ACTIVE_TIME_MESSAGE,
  MINIMUM_WEIGHT_MESSAGE,
  MINIMUM_VALUE_MESSAGE,
  MAXIMUM_WEIGHT_MESSAGE,
  MAXIMUM_DRANK_WATER_MESSAGE,
} from '../helpers/constants';

export const myDailyNormaValidationSchema = Yup.object().shape({
  gender: Yup.string().required(REQUIRED_MESSAGE),
  weight: Yup.number()
    .required(REQUIRED_MESSAGE)
    .min(1, MINIMUM_WEIGHT_MESSAGE)
    .max(500, MAXIMUM_WEIGHT_MESSAGE),
  activityTime: Yup.number().min(0, MINIMUM_ACTIVE_TIME_MESSAGE),
  drankWater: Yup.number()
    .required(REQUIRED_MESSAGE)
    .min(0.001, MINIMUM_VALUE_MESSAGE)
    .max(15, MAXIMUM_DRANK_WATER_MESSAGE),
});
