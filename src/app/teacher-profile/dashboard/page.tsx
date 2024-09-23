import React from 'react';
import { FaBook, FaListAlt, FaChalkboardTeacher, FaUserGraduate, FaBookOpen } from 'react-icons/fa'; // Иконки
import './TeacherDash.scss'; // Подключение стилей

const TeacherDashboard: React.FC = () => {
  // Моки для отображаемых данных
  const stats = {
    courses: 0,
    modules: 0,
    chapters: 0,
    lessons: 0,
    students: 0,
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-title">Учительский дашборд</div>

      <div className="dashboard-stats">
        <div className="stat-item">
          <FaBook className="stat-icon" />
          <div className="stat-info">
            <span className="stat-number">{stats.courses}</span>
            <span className="stat-label">Курсы</span>
          </div>
        </div>

        <div className="stat-item">
          <FaListAlt className="stat-icon" />
          <div className="stat-info">
            <span className="stat-number">{stats.modules}</span>
            <span className="stat-label">Модули</span>
          </div>
        </div>

        <div className="stat-item">
          <FaBookOpen className="stat-icon" />
          <div className="stat-info">
            <span className="stat-number">{stats.chapters}</span>
            <span className="stat-label">Главы</span>
          </div>
        </div>

        <div className="stat-item">
          <FaChalkboardTeacher className="stat-icon" />
          <div className="stat-info">
            <span className="stat-number">{stats.lessons}</span>
            <span className="stat-label">Уроки</span>
          </div>
        </div>

        <div className="stat-item">
          <FaUserGraduate className="stat-icon" />
          <div className="stat-info">
            <span className="stat-number">{stats.students}</span>
            <span className="stat-label">Ученики</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
