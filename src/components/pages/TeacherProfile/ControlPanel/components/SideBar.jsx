import React from 'react';
import { Link } from "react-router-dom"
import { Menu } from 'antd';
import { UserOutlined, PlusCircleOutlined, SettingOutlined, LockOutlined, LogoutOutlined } from '@ant-design/icons';
import "./SideBar.scss";

const { SubMenu } = Menu;

function SideBar() {
  return (
    <div className="teacher-sidebar">
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        // style={{ width: 200 }}
      >
        <Menu.Item key="1">
          <Link to="dashboard">Дашборд</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          <Link to="my-courses">Мои курсы</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<PlusCircleOutlined />}>
          <Link to="add-course">Добавить курс</Link>
        </Menu.Item>
        {/* <Menu.Item key="3" icon={<FormOutlined />}>
          <Link to="teacher-quizes">Квизы</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<FileAddOutlined />}>
          <Link to="add-quiz">Добавить квиз</Link>
        </Menu.Item> */}
        <SubMenu key="sub1" icon={<SettingOutlined />} title="Настройки">
          <Menu.Item key="5">
            <Link to="profile-settings">Настройки профиля</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="reset-password">Смена пароля</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="7" icon={<LockOutlined />}>
          <Link to="/logout">Выход</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default SideBar;
