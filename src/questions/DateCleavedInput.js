import Cleave from 'cleave.js/react';

const DateCleavedInput = ({
  placeholder,
  name,
  formik,
  handleKeyDown,
  onFocus,
}) => {
  const isValid = () => {
    return (
      formik.touched[name] && (!formik.errors[name] ? 'is-valid' : 'is-invalid')
    );
  };

  return (
    <Cleave
      placeholder={placeholder}
      inputMode="numeric"
      name={name}
      className={`form-control ${isValid()}`}
      options={{
        date: true,
        delimiter: '/',
        datePattern: ['d', 'm', 'Y'],
      }}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      onFocus={onFocus}
      onKeyDown={handleKeyDown}
      value={formik.values[name]}
    />
  );
};

export default DateCleavedInput;
