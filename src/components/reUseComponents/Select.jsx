import React from 'react';
import { Select } from 'antd';
import './Select.scss';

const CustomSelect = ({ mode, options, placeholder, onChange }) => (
  <div className="">
    <p>Выберите нужный вариант:</p>
    <Select mode={mode} placeholder={placeholder} onChange={onChange} className="custom-select">
      {options.map(option => (
        <Select.Option key={option.value} value={option.value}>
          {option.label}
        </Select.Option>
      ))}
    </Select>
  </div>
);

export default CustomSelect;