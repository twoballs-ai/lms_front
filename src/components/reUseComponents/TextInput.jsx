import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

const TextInput = ({ isTextArea, placeholder, value, onChange }) => {
  return (
    <div>
      {isTextArea ? (
        <TextArea value={value} placeholder={placeholder} onChange={onChange} autoSize={{ minRows: 3, maxRows: 6 }} />
      ) : (
        <Input value={value} placeholder={placeholder} onChange={onChange} />
      )}
    </div>
  );
};

export default TextInput;