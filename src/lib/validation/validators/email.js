import * as Yup from 'yup';

export default () => {
  return Yup.string()
    .email('common:validation.invalid_email')
    .required('common:validation.required');
};
