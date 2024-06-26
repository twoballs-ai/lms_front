import React from 'react';
import { Link } from "react-router-dom";
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import "./SideBar.scss";

const { SubMenu } = Menu;

function SideBar() {
  return (
    <div className="sidebar">
      <Menu mode="inline">
        <Menu.Item key="my-courses" icon={<AppstoreOutlined />}>
          <Link to="my-courses">Мои курсы</Link>
        </Menu.Item>
        
        <SubMenu key="profile" icon={<SettingOutlined />} title="Профиль">
          {/* <Menu.Item key="profile-settings">
            <Link to="profile-settings">Настройки профиля</Link>
          </Menu.Item> */}
          <Menu.Item key="reset-password">
            <Link to="reset-password">Смена пароля</Link>
          </Menu.Item>
        </SubMenu>

        <Menu.Item key="logout" icon={<MailOutlined />}>
          <Link to="/logout">Выход</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default SideBar;
