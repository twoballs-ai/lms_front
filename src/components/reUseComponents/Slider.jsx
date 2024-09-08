import React from 'react';
import { Slider, InputNumber } from 'antd';

// Многоразовый компонент слайдера с числовым вводом
const ReusableSliderWithInput = ({
  min = 0,
  max = 100,
  defaultValue,
  onChange,
  value,
  style = {},
  inputStyle = {},
  sliderStyle = {},
  ...props
}) => {
  const defaultStyle = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  };

  const combinedStyle = { ...defaultStyle, ...style };

  const defaultInputStyle = {
    marginLeft: '10px',
    width: '80px',
  };

  const combinedInputStyle = { ...defaultInputStyle, ...inputStyle };

  const defaultSliderStyle = {
    flexGrow: 1,
  };

  const combinedSliderStyle = { ...defaultSliderStyle, ...sliderStyle };

  const handleSliderChange = (value) => {
    if (onChange) {
      onChange(value);
    }
  };

  const handleInputChange = (value) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div style={combinedStyle}>
      <Slider
        min={min}
        max={max}
        defaultValue={defaultValue}
        onChange={handleSliderChange}
        value={value}
        style={combinedSliderStyle}
        {...props}
      />
      <InputNumber
        min={min}
        max={max}
        value={value}
        onChange={handleInputChange}
        style={combinedInputStyle}
      />
    </div>
  );
};

export default ReusableSliderWithInput;