import React, { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';

import classes from './DropDown.module.css';

const DropDown = props => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonId = `dropdown-button-${props.label?.toLowerCase().replace(/\s+/g, '-')}`;

  useEffect(() => {
    const handleCloseDropdownOnClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleCloseDropdownOnClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleCloseDropdownOnClickOutside);
    };
  }, []);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSelect = key => {
    props.setSelected(key);
    setOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={`${classes.container} ${props.className}`}
      style={props.style}
    >
      {props.label && (
        <label id={`${buttonId}-label`} className={classes.label}>
          {props.label}
        </label>
      )}
      <button
        id={buttonId}
        onClick={handleOpen}
        className={classes.dropdown}
        aria-expanded={open}
        aria-labelledby={`${buttonId}-label`}
      >
        {props.leftIcon && (
          <span className={classes.leftIcon} aria-hidden="true">
            {props.leftIcon}
          </span>
        )}
        <span className={classes.dropdownText}>{props.selected}</span>
        <div className={classes.dropdownToggle} aria-hidden="true">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.2 5.3894H7.8C6.2536 5.3894 5 6.64301 5 8.1894V16.5894C5 18.1358 6.2536 19.3894 7.8 19.3894H16.2C17.7464 19.3894 19 18.1358 19 16.5894V8.1894C19 6.64301 17.7464 5.3894 16.2 5.3894Z"
              stroke="#E5E5E5"
              strokeWidth="1.03427"
            />
            <path
              className={`${classes.toggleArrow} ${open ? classes.toggled : ''}`}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.20711 11.3894C8.76165 11.3894 8.53857 11.928 8.85355 12.243L11.6464 15.0359C11.8417 15.2311 12.1583 15.2311 12.3536 15.0358L15.1464 12.243C15.4614 11.928 15.2383 11.3894 14.7929 11.3894H9.20711Z"
              fill="#6D7587"
            />
          </svg>
        </div>
      </button>
      {open && (
        <ul className={classes.menu} role="menu">
          {props.options.map(({ option, key, icon }, index) => (
            <li key={`${key}-${option}-${index}`} className={classes['menu-item']} role="menuitem">
              <button className={classes.button} onClick={() => handleSelect(key)}>
                {icon && (
                  <span className={classes.icon} aria-hidden="true">
                    {icon}
                  </span>
                )}
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

DropDown.propTypes = {
  selected: PropTypes.string,
  setSelected: PropTypes.func,
  label: PropTypes.string,
  options: PropTypes.array,
  leftIcon: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default DropDown;
