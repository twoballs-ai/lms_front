import React from 'react';
import { Link } from "react-router-dom";
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import "./SideBar.scss";

const { SubMenu } = Menu;

function SideBar() {
  return (
    <div className="sidebar">
      <Menu
        // style={{ width: 256 }}
        mode="inline"
      >
        <Menu.Item key="my-courses" icon={<AppstoreOutlined />}>
          <Link to="my-courses">Мои курсы</Link>
        </Menu.Item>
        {/* <Menu.Item key="favorite-courses" icon={<AppstoreOutlined />}>
          <Link to="favorite-courses">Избранные курсы</Link>
        </Menu.Item> */}
        {/* Uncomment and add icons if needed */}
        {/* <SubMenu key="quizzes" icon={<SettingOutlined />} title="Квизы">
          <Menu.Item key="teacher-quizes">
            <Link to="teacher-quizes">Квизы</Link>
          </Menu.Item>
          <Menu.Item key="add-quiz">
            <Link to="add-quiz">Добавить квиз</Link>
          </Menu.Item>
        </SubMenu> */}
        {/* <Menu.Item key="profile-settings" icon={<MailOutlined />}>
          <Link to="profile-settings">Настройки профиля</Link>
        </Menu.Item>
        <Menu.Item key="reset-password" icon={<MailOutlined />}>
          <Link to="reset-password">Смена пароля</Link>
        </Menu.Item> */}
        <Menu.Item key="logout" icon={<MailOutlined />}>
          <Link to="/logout">Выход</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default SideBar;
