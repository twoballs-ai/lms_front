import React from 'react';
import { Switch } from 'antd';

// Многоразовый компонент переключателя
const ReusableSwitch = ({
    defaultChecked = false,
    onChange,
    checkedChildren,
    unCheckedChildren,
    style = {},
  }) => {
    const defaultStyle = {
      padding: '8px',
      width: '100%',
    };
  
    const combinedStyle = { ...defaultStyle, ...style };
  
    return (
      <div style={combinedStyle}>
        <Switch
          defaultChecked={defaultChecked}
          onChange={onChange}
          checkedChildren={checkedChildren}
          unCheckedChildren={unCheckedChildren}
        />
      </div>
    );
  };
  
  export default ReusableSwitch;