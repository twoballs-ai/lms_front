import React from "react";
import "./TextInput.scss";

interface TextInputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  style?: React.CSSProperties;
  error?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  className?: string;
  isTextArea?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  style = {},
  error,
  prefix,
  suffix,
  className = "",
  isTextArea = false,
}) => {
  const isArea = isTextArea || type === "textarea";

  return (
    <div
      className={["custom-text-input", error ? "ui-input-shell--error" : "", className]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {prefix && <div className="prefix-icon">{prefix}</div>}

      {isArea ? (
        <textarea value={value} placeholder={placeholder} onChange={onChange} />
      ) : (
        <input type={type} value={value} placeholder={placeholder} onChange={onChange} />
      )}

      {suffix && <div className="suffix-icon">{suffix}</div>}
      {error && <div className="input-error">{error}</div>}
    </div>
  );
};

export default TextInput;
