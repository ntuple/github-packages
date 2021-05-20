import moment, { isMoment } from 'moment';

const thaiYearThreshold = 2400;
const thaiYearDifference = 543;
const supportedFormats = ['DD/MM/YYYY', 'YYYY-MM-DD'];

export const convertToMoment = (date) => {
  if (date instanceof Date) {
    return moment(date);
  } else {
    return moment(date, supportedFormats);
  }
};

export const isThaiYear = (date) => {
  if (!isMoment(date)) {
    date = convertToMoment(date);
  }

  return date.year() > thaiYearThreshold;
};

export const normalizeDate = (date) => {
  let normalizedDate = date;
  if (!isMoment(date)) {
    normalizedDate = convertToMoment(date);
  }

  if (isThaiYear(normalizedDate)) {
    normalizedDate.year(normalizedDate.year() - thaiYearDifference);
  }

  return normalizedDate;
};
