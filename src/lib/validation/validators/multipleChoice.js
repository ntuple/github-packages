import * as Yup from 'yup';

export default (params) => {
  let multipleChoice = Yup.array().required('common:validation.required');
  if (params.min) {
    multipleChoice = multipleChoice.min(
      params.min,
      `Selected item must not be less than ${params.min}`
    );
  }

  if (params.max) {
    multipleChoice = multipleChoice.max(
      params.max,
      `Selected item must not be more than ${[params.max]}`
    );
  }

  return multipleChoice;
};
