import React from 'react';
import { UserOutlined, PlusCircleOutlined, SettingOutlined, LockOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from "react-router-dom";
import "./SideBar.scss";

const items = [
  {
    key: '1',
    label: <Link to="dashboard">Дашборд</Link>,
  },
  {
    key: '2',
    label: <Link to="my-courses">Мои курсы</Link>,
    icon: <UserOutlined />,
  },
  {
    key: '3',
    label: <Link to="add-course">Добавить курс</Link>,
    icon: <PlusCircleOutlined />,
  },
  {
    key: 'sub1',
    label: 'Настройки',
    icon: <SettingOutlined />,
    children: [
      {
        key: '5',
        label: <Link to="profile-settings">Настройки профиля</Link>,
      },
      {
        key: '6',
        label: <Link to="reset-password">Смена пароля</Link>,
      },
    ],
  },
  {
    key: '7',
    label: <Link to="/logout">Выход</Link>,
    icon: <LockOutlined />,
  },
];

const SideBar = () => {
  return (
    <div className="teacher-sidebar">
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        items={items}
      />
    </div>
  );
};

export default SideBar;
