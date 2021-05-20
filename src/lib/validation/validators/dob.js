import * as Yup from 'yup';
import moment from 'moment';
import { normalizeDate } from '../../date';

export default (params) => {
  let dob = Yup.date()
    .transform(function (value, originalValue) {
      const newValue = normalizeDate(originalValue);
      return newValue.toDate();
    })
    .typeError('common:validation.invalid_date')
    .required('common:validation.required');

  if (params.min_age) {
    dob = dob.max(moment().subtract(params.min_age, 'years').toDate(), {
      key: 'common:validation.invalid_min_age',
      values: { min_age: params.min_age },
    });
  }

  if (params.max_age) {
    dob = dob.min(
      moment().subtract(params.max_age, 'years').startOf('date').toDate(), // use startOf to set 12:00 am of max age
      {
        key: 'common:validation.invalid_max_age',
        values: { max_age: params.max_age },
      }
    );
  }

  if (!params.min_age) {
    dob = dob.max(moment().toDate(), 'common:validation.invalid_dob');
  }

  return dob;
};
