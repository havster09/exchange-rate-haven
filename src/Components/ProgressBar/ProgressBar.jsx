import PropTypes from 'prop-types';
import { useLayoutEffect, useRef, useState } from 'react';

import classes from './ProgressBar.module.css';

const ProgressBar = ({ progress, animationClass, style }) => {
    const ref = useRef(null);

    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        setWidth(ref.current.offsetWidth);
    }, []);

    return (
        <div ref={ref} className={classes.base} style={style} role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress * 100}
    >
            <div
                className={`${classes.progress} ${animationClass}`}
                style={{ transform: `translate(-${width * (1 - progress)}px)` }}
            ></div>
        </div>
    );
};

ProgressBar.propsTypes = {
    style: PropTypes.object,
    progress: PropTypes.number, // 0.0 - 1
    animationClass: PropTypes.string,
};

export default ProgressBar;
