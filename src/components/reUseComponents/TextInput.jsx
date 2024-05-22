import React from 'react';
import { Input } from 'antd';

const { TextArea, Password } = Input;

const TextInput = ({ type, placeholder, value, onChange, style = {} }) => {
  const defaultStyle = {
    margin: '10px 0',
    padding: '8px',
    width: '100%',
  };

  const combinedStyle = { ...defaultStyle, ...style };

  const getInputComponent = () => {
    switch (type) {
      case 'textarea':
        return (
          <TextArea
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            autoSize={{ minRows: 3, maxRows: 6 }}
            style={combinedStyle}
          />
        );
      case 'email':
        return (
          <Input
            type="email"
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            style={combinedStyle}
          />
        );
      case 'phone':
      case 'text':
        return (
          <Input
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            style={combinedStyle}
          />
        );
      case 'password':
        return (
          <Password
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            style={combinedStyle}
          />
        );
      default:
        return (
          <Input
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            style={combinedStyle}
          />
        );
    }
  };

  return <div style={combinedStyle}>{getInputComponent()}</div>;
};

export default TextInput;
