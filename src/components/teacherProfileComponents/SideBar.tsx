"use client"; // Required for client-side rendering in Next.js
import React, { useState } from 'react';
import { FaUser, FaPlusCircle, FaCog, FaChevronDown, FaChevronRight, FaKey } from 'react-icons/fa'; // Using icons from react-icons
import Link from 'next/link'; // For routing
import "./SideBar.scss";

// Define the structure of menu items
type MenuItem = {
  key: string;
  label: string;
  href: string;
  hoverColor: string;
  activeColor: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
};

const SideBar: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string>('1'); // Track active menu item
  const [openKey, setOpenKey] = useState<string | null>(null); // Track open submenu

  // Define your menu items with specific hover and active colors and icons
  const items: MenuItem[] = [
    {
      key: '1',
      label: 'Дашборд',
      href: '/teacher-profile/dashboard',
      hoverColor: '#00796b',
      activeColor: '#004d40',
      icon: <FaUser size={24} />, // Larger icon size
    },
    {
      key: '2',
      label: 'Мои курсы',
      href: '/teacher-profile/my-courses',
      hoverColor: '#ff9800',
      activeColor: '#f57c00',
      icon: <FaPlusCircle size={24} />,
    },
    {
      key: '3',
      label: 'Добавить курс',
      href: '/teacher-profile/add-course',
      hoverColor: '#8e24aa',
      activeColor: '#6a1b9a',
      icon: <FaPlusCircle size={24} />,
    },
    {
      key: '4',
      label: 'Настройки',
      href: '#',
      hoverColor: '#3949ab',
      activeColor: '#303f9f',
      icon: <FaCog size={24} />,
      children: [
        {
          key: '5',
          label: 'Настройки профиля',
          href: '/teacher-profile/profile-settings',
          hoverColor: '#e64a19',
          activeColor: '#d84315',
          icon: <FaUser size={16} /> // Icon for submenu item
        },
        {
          key: '6',
          label: 'Смена пароля',
          href: '/teacher-profile/reset-password',
          hoverColor: '#43a047',
          activeColor: '#2e7d32',
          icon: <FaKey size={16} /> // Icon for submenu item
        },
      ],
    },
  ];

  // Function to handle active item click
  const handleClick = (key: string) => {
    setActiveKey(key);
  };

  // Function to handle submenu toggle
  const toggleSubmenu = (key: string) => {
    setOpenKey(openKey === key ? null : key);
  };

  return (
    <div className="custom-sidebar">
      <ul className="menu">
        {items.map((item) => (
          <li
            key={item.key}
            className={`menu-item ${activeKey === item.key ? 'active' : ''}`}
            style={{
              '--hover-color': item.hoverColor,
              '--active-color': activeKey === item.key ? item.activeColor : '#333',
            } as React.CSSProperties} // Dynamically set colors
          >
            <div className="menu-link" onClick={() => item.children ? toggleSubmenu(item.key) : handleClick(item.key)}>
              {item.icon && <span className="menu-icon">{item.icon}</span>}
              <Link href={item.href}>{item.label}</Link>
              {item.children && (
                <span className="submenu-toggle">
                  {openKey === item.key ? <FaChevronDown size={16} /> : <FaChevronRight size={16} />}
                </span>
              )}
            </div>

            {item.children && openKey === item.key && (
              <ul className="submenu-vertical">
                {item.children.map((child) => (
                  <li
                    key={child.key}
                    className={`submenu-item ${activeKey === child.key ? 'active' : ''}`}
                    style={{
                      '--hover-color': child.hoverColor,
                      '--active-color': activeKey === child.key ? child.activeColor : '#666',
                    } as React.CSSProperties}
                  >
                    <Link href={child.href} onClick={() => handleClick(child.key)}>
                      {child.icon && <span className="menu-icon">{child.icon}</span>}
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
