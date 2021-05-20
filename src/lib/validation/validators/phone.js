import * as Yup from 'yup';

export default () => {
  return Yup.string()
    .matches(/((^(02|03|04|05|07)\d{7}$)|(^(08|09|06)\d{8}$))/, {
      message: 'common:validation.invalid_phone',
    })
    .max(10)
    .required('common:validation.required');
};
