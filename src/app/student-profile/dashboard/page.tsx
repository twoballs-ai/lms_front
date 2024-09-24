import React from 'react';
import { FaStar, FaBolt, FaTasks, FaBookOpen } from 'react-icons/fa'; // Иконки
import './StudentDash.scss'; // Подключение стилей

const StudentDashboard: React.FC = () => {
  // Моки для отображаемых данных
  const stats = {
    rating: 4.5,
    energy: 100,
    completedTasks: 10,
    completedCourses: 2,
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-title">Студенческий дашборд</div>

      <div className="dashboard-stats">
        <div className="stat-item">
          <FaStar className="stat-icon" />
          <div className="stat-info">
            <span className="stat-number">{stats.rating}</span>
            <span className="stat-label">Рейтинг</span>
          </div>
        </div>

        <div className="stat-item">
          <FaBolt className="stat-icon" />
          <div className="stat-info">
            <span className="stat-number">{stats.energy}%</span>
            <span className="stat-label">Энергия</span>
          </div>
        </div>

        <div className="stat-item">
          <FaTasks className="stat-icon" />
          <div className="stat-info">
            <span className="stat-number">{stats.completedTasks}</span>
            <span className="stat-label">Задачи выполнены</span>
          </div>
        </div>

        <div className="stat-item">
          <FaBookOpen className="stat-icon" />
          <div className="stat-info">
            <span className="stat-number">{stats.completedCourses}</span>
            <span className="stat-label">Курсы пройдены</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
