import React from 'react';
import { Link } from "react-router-dom"
import "./SideBar.scss"

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__menu">
        <Link to="my-courses" className="sidebar__menu-item">
          <div className="sidebar__menu-item-block">
            <p>Мои курсы</p>
          </div>
        </Link>
        <Link to="add-course" className="sidebar__menu-item">
          <div className="sidebar__menu-item-block">
            <p>Добавить курс</p>
          </div>
        </Link>
        {/* <Link to="teacher-quizes" className="sidebar__menu-item">
          <div className="sidebar__menu-item-block">
            <p>Квизы</p>
          </div>
        </Link>
        <Link to="add-quiz" className="sidebar__menu-item">
          <div className="sidebar__menu-item-block">
            <p>Добавить квиз</p>
          </div>
        </Link> */}
        <Link to="profile-settings" className="sidebar__menu-item">
          <div className="sidebar__menu-item-block">
            <p>Настройки профиля</p>
          </div>
        </Link>
        <Link to="reset-password" className="sidebar__menu-item">
          <div className="sidebar__menu-item-block">
            <p>Смена пароля</p>
          </div>
        </Link>
        <Link to="/logout" className="sidebar__menu-item">
          <div className="sidebar__menu-item-block">
            <p>Выход</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default SideBar
