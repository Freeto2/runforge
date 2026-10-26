import React from 'react';

const Button = ({classes, ...props}) => {
    return (
        <button className={classes ? classes + ' btn' : 'btn'} {...props}>
            {props.children}
        </button>
    );
};

export default Button;