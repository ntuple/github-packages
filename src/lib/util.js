import jexl from 'jexl';

export const isValid = (val) => typeof val !== 'undefined' && val !== null;

export const millisec = (hour) => {
  // 60 * 60 * 1000 = minutes * secs * millisecs
  return hour * 60 * 60 * 1000;
};

export const evaluateCondition = (choice, formik) => {
  const isDisplayExpression = jexl.expr`values.${choice.displayCondition}`;

  return isDisplayExpression.evalSync({ values: { ...formik.values } });
};
