import classes from './Flag.module.css';

const Flag = ({ code }) => (
  <img
    alt={code || ''}
    src={`/img/flags/${code || ''}.svg`}
    width="20px"
    className={classes.flag}
  />
);

export default Flag;
