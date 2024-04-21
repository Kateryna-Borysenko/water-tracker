import * as Yup from 'yup';
import {
  REQUIRED_MESSAGE,
  POSITIVE_NUMBER_MESSAGE,
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
  activityTime: Yup.number().min(0, POSITIVE_NUMBER_MESSAGE),
  drankWater: Yup.number()
    .required(REQUIRED_MESSAGE)
    .min(1, MINIMUM_VALUE_MESSAGE)
    .max(15000, MAXIMUM_DRANK_WATER_MESSAGE),
});
