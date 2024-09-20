import React from 'react';
import './TextInput.scss';  // Подключение кастомных стилей
import { MailOutlined, LockOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';

const TextInput = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  style = {}, 
  error, 
  prefix, 
  suffix 
}) => {
  const defaultStyle = {
    padding: '8px 12px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    boxSizing: 'border-box',
  };

  const inputStyle = {
    flex: 1,
    border: 'none',
    outline: 'none',
    padding: '8px',
  };

  const combinedStyle = { ...defaultStyle, ...style };

  return (
    <div className="custom-text-input" style={combinedStyle}>
      {prefix && <div className="prefix-icon">{prefix}</div>}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        style={inputStyle}
      />
      {suffix && <div className="suffix-icon">{suffix}</div>}
      {error && <div className="input-error">{error}</div>}
    </div>
  );
};

export default TextInput;


// import React from 'react';
// import TextInput from './TextInput';
// import { MailOutlined, LockOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';

// const MyForm = () => {
//   const handleChange = (e) => {
//     console.log(e.target.value);
//   };

//   return (
//     <div>
//       {/* Email Input */}
//       <TextInput
//         type="email"
//         placeholder="Enter your email"
//         prefix={<MailOutlined />}
//         onChange={handleChange}
//       />

//       {/* Phone Input */}
//       <TextInput
//         type="tel"
//         placeholder="Enter your phone number"
//         prefix={<PhoneOutlined />}
//         onChange={handleChange}
//       />

//       {/* Text Input */}
//       <TextInput
//         type="text"
//         placeholder="Enter your username"
//         prefix={<UserOutlined />}
//         onChange={handleChange}
//       />

//       {/* Password Input */}
//       <TextInput
//         type="password"
//         placeholder="Enter your password"
//         prefix={<LockOutlined />}
//         onChange={handleChange}
//       />
//     </div>
//   );
// };

// export default MyForm;
