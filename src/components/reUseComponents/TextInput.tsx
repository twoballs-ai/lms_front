import React, { ChangeEvent } from 'react';
import { Input } from 'antd';

const { TextArea, Password } = Input;

interface TextInputProps {
  type?: 'textarea' | 'email' | 'phone' | 'text' | 'password';
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  style?: React.CSSProperties;
}

const TextInput: React.FC<TextInputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  style = {},
}) => {
  const defaultStyle: React.CSSProperties = {
    padding: '8px',
    width: '100%',
  };

  const combinedStyle: React.CSSProperties = { ...defaultStyle, ...style };

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

  return <div style={{ width: '100%' }}>{getInputComponent()}</div>;
};

export default TextInput;
