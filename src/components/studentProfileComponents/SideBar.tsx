"use client"; // Required for client-side rendering in Next.js
import React from 'react';
import { UserOutlined, BookOutlined } from '@ant-design/icons';
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
      label: <Link href="/student-profile/dashboard">Дашборд</Link>,
      icon: <UserOutlined />,
    },
    {
      key: '2',
      label: <Link href="/student-profile/courses">Мои курсы</Link>,
      icon: <BookOutlined />,
    },
    // {
    //   key: '3',
    //   label: <Link href="/student-profile/profile">Профиль</Link>,
    //   icon: <UserOutlined />,
    // },
    // {
    //   key: '4',
    //   label: <Link href="/student-profile/feedback">Обратная связь</Link>,
    //   icon: <FormOutlined />,
    // },
  ];

  return (
    <div className="student-sidebar">
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        items={items}
      />
    </div>
  );
};

export default SideBar;
