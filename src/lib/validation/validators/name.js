import * as Yup from 'yup';

export default (params) => {
  const regExp = /^([^0-9]*)$/;

  let rule = Yup.string().matches(regExp, {
    message: 'common:validation.invalid_name',
  });

  if (params.min) {
    rule = rule.min(params.min, {
      key: 'common:validation.invalid_too_short',
      values: { min: params.min },
    });
  }

  if (params.max) {
    rule = rule.max(params.max, {
      key: 'common:validation.invalid_too_long',
      values: { max: params.max },
    });
  }

  if (params.requiredIf) {
    const { field, value } = params.requiredIf;
    return Yup.string().when(field, {
      is: value,
      then: rule.required('common:validation.required'),
    });
  }

  return rule.required('common:validation.required');
};
