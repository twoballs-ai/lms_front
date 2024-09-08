import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from "react-router-dom";
import "./SideBar.scss";

const items = [
  {
    key: 'dashboard',
    label: <Link to="dashboard">Дашборд</Link>,
  },
  {
    key: 'my-courses',
    icon: <AppstoreOutlined />,
    label: <Link to="my-courses">Мои курсы</Link>,
  },
  {
    key: 'profile',
    icon: <SettingOutlined />,
    label: 'Профиль',
    children: [
      {
        key: 'reset-password',
        label: <Link to="reset-password">Смена пароля</Link>,
      },
    ],
  },
  {
    key: 'logout',
    icon: <MailOutlined />,
    label: <Link to="/logout">Выход</Link>,
  },
];

function SideBar() {

  return (
    <div className="sidebar">
      <Menu
        style={{ width: 256 }}
        defaultSelectedKeys={['my-courses']}
        mode="inline"
        items={items}
      />
    </div>
  );
}

export default SideBar;
