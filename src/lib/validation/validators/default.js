import * as Yup from 'yup';

export default (params) => {
  let rule = Yup.string();

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
    return Yup.string()
      .nullable()
      .when(field, {
        is: value,
        then: rule.required('common:validation.required'),
      });
  }

  return rule.nullable().required('common:validation.required');
};
