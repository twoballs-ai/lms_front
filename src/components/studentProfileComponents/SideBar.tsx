"use client"; // Required for client-side rendering in Next.js
import React from 'react';
import { UserOutlined, BookOutlined, LogoutOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import Link from 'next/link'; // Import Link from next/link for routing
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import "./SideBar.scss";

// Define types for menu items
type MenuItem = {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: MenuItem[];
};

const SideBar: React.FC = () => {
  const router = useRouter();

  // Handle logout logic
  const handleLogout = () => {
    localStorage.clear(); // Clear all local storage items
    // Optionally, remove cookies or session storage if used
    // sessionStorage.clear(); 
    // document.cookie = "key=; expires=Thu, 01 Jan 1970 00:00:00 GMT"; 

    // Redirect to home page
    router.push('/');
  };

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
    {
      key: '5',
      label: <a onClick={handleLogout} style={{ cursor: 'pointer' }}>Выход</a>, // Use an anchor tag with onClick handler for logout
      icon: <LogoutOutlined />,
    },
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
