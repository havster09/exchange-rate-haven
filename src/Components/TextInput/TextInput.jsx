import React from 'react';
import PropTypes from 'prop-types';
import classes from './TextInput.module.css';

const TextInput = ({ value, onChange, label, placeholder, leftIcon, id, className }) => {
  const inputId = id || 'amount-input';

  const handleChange = e => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    const decimalCount = (value.match(/\./g) || []).length;
    if (decimalCount > 1) return;

    onChange(value);
  };

  return (
    <div className={`${classes.container} ${className || ''}`}>
      <label htmlFor={inputId} className={classes.label}>
        {label}
      </label>
      <div className={classes.inputWrapper}>
        {leftIcon && (
          <div className={classes.leftIcon} aria-hidden="true">
            {leftIcon}
          </div>
        )}
        <input
          type="text"
          inputMode="decimal"
          pattern="[0-9]*[.]?[0-9]*"
          id={inputId}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`${classes.input} ${leftIcon ? classes.hasLeftIcon : ''}`}
          aria-label={`${label} in ${placeholder}`}
        />
      </div>
    </div>
  );
};

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  leftIcon: PropTypes.node,
  id: PropTypes.string,
  className: PropTypes.string,
};

export default TextInput;
