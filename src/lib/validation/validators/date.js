import * as Yup from 'yup';
import moment from 'moment';
import { normalizeDate } from '../../date';
import { isKeySet } from '../../object';

export default (params) => {
  let date = Yup.date()
    .transform(function (value, originalValue) {
      const newValue = normalizeDate(originalValue);
      return newValue.toDate();
    })
    .typeError('common:validation.invalid_date');

  if (isKeySet(params, 'required')) {
    date = date.required('common:validation.required').nullable();
  }

  if (isKeySet(params, 'from_days')) {
    const fromDate = moment().add(params.from_days, 'days').startOf('day');
    date = date.min(fromDate.toDate(), {
      key: 'common:validation.invalid_date_start_from',
      values: { date: fromDate.format('DD/MM/YYYY') },
    });
  }

  if (isKeySet(params, 'to_days')) {
    const toDate = moment().add(params.to_days, 'days').startOf('day');
    date = date.max(toDate.toDate(), {
      key: 'common:validation.invalid_date_start_to',
      values: { date: toDate.format('DD/MM/YYYY') },
    });
  }

  return date;
};
