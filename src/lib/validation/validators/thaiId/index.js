import * as Yup from 'yup';

const validateThaiID = (id) => {
  if (id == null || id.length !== 13 || !/^[0-9]\d+$/.test(id)) {
    return false;
  }

  let i;
  let sum = 0;
  for (i = 0, sum = 0; i < 12; i++) {
    sum += parseInt(id.charAt(i)) * (13 - i);
  }

  const check = (11 - (sum % 11)) % 10;

  return check === parseInt(id.charAt(12));
};

export default (params) => {
  if (params?.requiredIf) {
    const { field, value } = params.requiredIf;

    return Yup.string().when(field, {
      is: value,
      then: Yup.string()
        .test(
          'validate-thai-id',
          'common:validation.invalid_thai_id',
          validateThaiID
        )
        .required('common:validation.required'),
    });
  }

  return Yup.string()
    .test(
      'validate-thai-id',
      'common:validation.invalid_thai_id',
      validateThaiID
    )
    .required('common:validation.required');
};
