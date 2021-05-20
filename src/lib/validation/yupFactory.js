import email from './validators/email';
import phone from './validators/phone';
import date from './validators/date';
import dob from './validators/dob';
import name from './validators/name';
import multipleChoice from './validators/multipleChoice';
import thaiID from './validators/thaiId';
import defaultRule from './validators/default';

export default (rule, params) => {
  switch (rule) {
    case 'email':
      return email(params);
    case 'phone':
      return phone(params);
    case 'name':
      return name(params);
    case 'date':
      return date(params);
    case 'dob':
      return dob(params);
    case 'multiple_choice':
      return multipleChoice(params);
    case 'thai_id':
      return thaiID(params);
    case 'text':
    case 'default':
      return defaultRule(params);
  }

  return null;
};
