import React from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";
import "./Select.scss";

interface OptionType {
  value: string | number;
  label: string;
}

interface CustomSelectProps {
  mode?: "multiple" | "tags";
  options: OptionType[];
  placeholder?: string;
  onChange?: (value: string | number | (string | number)[]) => void;
  value?: string | number | (string | number)[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  mode,
  options,
  placeholder,
  onChange,
  value
}) => (
  <div className="custom-select-wrapper">
    <Select
      mode={mode}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className="custom-select"
      options={options}
    />
  </div>
);

export default CustomSelect;