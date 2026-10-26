import React from 'react';

const Select = ({options, defaultValue, value, onChange}) => {
    return (
        <div className={'custom-select'}>
            <select
                className={'select'}
                value={value}
                onChange={(e) => {onChange(e.target.value)}}
            >
                <option disabled value={defaultValue}>{defaultValue}</option>
                {options.map((option, key) => (
                    <option key={key} value={option.value}>{option.label}</option>
                ))}
            </select>

            <div className="custom-select__icon">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.5 6L9 13.5L1.5 6L2.83125 4.66875L9 10.8375L15.1688 4.66875L16.5 6Z" fill="currentColor"/>
                </svg>
            </div>
        </div>
    );
};

export default Select;