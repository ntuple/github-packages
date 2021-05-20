/* eslint-disable no-console */
import Bugsnag from '..';

const logError = (error) => {
  if (process.env.NODE_ENV === 'production') {
    Bugsnag.notify(error);
  } else {
    console.log(error); // Error object.
    console.log('error', error?.response?.data); // Error data.
  }
};

export default logError;
