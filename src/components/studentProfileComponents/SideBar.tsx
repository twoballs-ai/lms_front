"use client"; // Required for client-side rendering in Next.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBookOpen} from '@fortawesome/free-solid-svg-icons'; // FontAwesome icons
import Link from 'next/link'; // For routing
import "./StudentSideBar.scss"; // Import the updated SCSS file

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

const StudentSideBar: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string>('1'); // Track active menu item
  const [openKey, setOpenKey] = useState<string | null>(null); // Track open submenu

  // Define your menu items with specific hover and active colors and icons
  const items: MenuItem[] = [
    {
      key: '1',
      label: 'Дашборд',
      href: '/student-profile/dashboard',
      hoverColor: '#00796b',
      activeColor: '#004d40',
      icon: <FontAwesomeIcon icon={faUser} size="lg" />, // FontAwesome icon
    },
    {
      key: '2',
      label: 'Мои курсы',
      href: '/student-profile/courses',
      hoverColor: '#ff9800',
      activeColor: '#f57c00',
      icon: <FontAwesomeIcon icon={faBookOpen} size="lg" />, // FontAwesome icon
    },
    // {
    //   key: '3',
    //   label: 'Задачи',
    //   href: '/student-profile/tasks',
    //   hoverColor: '#8e24aa',
    //   activeColor: '#6a1b9a',
    //   icon: <FontAwesomeIcon icon={faTasks} size="lg" />, // FontAwesome icon
    // },
    // {
    //   key: '4',
    //   label: 'Рейтинг',
    //   href: '/student-profile/rating',
    //   hoverColor: '#43a047',
    //   activeColor: '#2e7d32',
    //   icon: <FontAwesomeIcon icon={faStar} size="lg" />, // FontAwesome icon
    // },
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
                  {openKey === item.key ? <FontAwesomeIcon icon={faChevronUp} size="sm" /> : <FontAwesomeIcon icon={faChevronDown} size="sm" />}
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

export default StudentSideBar;
