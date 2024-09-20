"use client"; // Required for client-side rendering in Next.js
import React from 'react';
import { UserOutlined, PlusCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import Link from 'next/link'; // Import Link from next/link for routing

import "./SideBar.scss";

// Define types for menu items
type MenuItem = {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: MenuItem[];
};

const SideBar: React.FC = () => {


  const items: MenuItem[] = [
    {
      key: '1',
      label: <Link href="/teacher-profile/dashboard">Дашборд</Link>,
    },
    {
      key: '2',
      label: <Link href="/teacher-profile/my-courses">Мои курсы</Link>,
      icon: <UserOutlined />,
    },
    {
      key: '3',
      label: <Link href="/teacher-profile/add-course">Добавить курс</Link>,
      icon: <PlusCircleOutlined />,
    },
    {
      key: 'sub1',
      label: 'Настройки',
      icon: <SettingOutlined />,
      children: [
        {
          key: '5',
          label: <Link href="/teacher-profile/profile-settings">Настройки профиля</Link>,
        },
        {
          key: '6',
          label: <Link href="/teacher-profile/reset-password">Смена пароля</Link>,
        },
      ],
    },

  ];

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
