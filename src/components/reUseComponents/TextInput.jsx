import React, { useState } from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

const TextInput = ({ isTextArea }) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      {isTextArea ? (
        <TextArea value={value} onChange={handleChange} autoSize={{ minRows: 3, maxRows: 6 }} />
      ) : (
        <Input value={value} onChange={handleChange} />
      )}
    </div>
  );
};

export default TextInput;