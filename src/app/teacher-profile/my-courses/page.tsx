"use client"; // Для client-side рендеринга в Next.js
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import TeacherService from '@/services/teacher.service';
import './MyTeacherCourses.scss';
import LmsButton from '@/components/reUseComponents/Button';
import { useRouter } from 'next/navigation'; // Используем useRouter вместо useNavigate в Next.js
import { SettingOutlined } from '@ant-design/icons';

// Определим тип данных курса
interface Course {
  id: number;
  title: string;
  status: string;
  moderation_status: string | null;
}

const MyTeacherCourses: React.FC = () => {
  const [courseData, setCourseData] = useState<Course[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchData();
    document.title = 'Профиль учителя - мои курсы - coursero.ru'; // Установка заголовка страницы
  }, []);

  const fetchData = async () => {
    try {
      const response = await TeacherService.teacherCourses();
      if (response.status === 200 || response.status === 201) {
        setCourseData(response.data.data);
      }
    } catch (error) {
      console.error("Ошибка при получении данных курсов:", error);
    }
  };

  const handleArchiveClick = async (course_id: number) => {
    try {
      const response = await TeacherService.archiveTeacherCourse(course_id);
      if (response.status === 200 || response.status === 201) {
        fetchData(); // Обновляем список курсов после архивации
      }
    } catch (error) {
      console.error("Ошибка при архивации курса:", error);
    }
  };

  const handleEditCourseClick = (course_id: number) => {
    // Перенаправляем пользователя на страницу редактирования курса
    router.push(`/course-editor/${course_id}`);
  };

  const handleSettingsCourseClick = (course_id: number) => {
    // Перенаправляем пользователя на страницу настроек курса
    router.push(`/course-settings/${course_id}`);
  };

  return (
    <div className="my-courses-container">
      <div className="my-courses-container__title">Мои курсы</div>

      {courseData.map((course) => (
        <div key={course.id} className="my-courses-container__course-item">
          <div className="course-item__course-title">
            {course.title}
            <p>Статус курса: {course.status}</p>
            {course.moderation_status !== null && (
              <p>Статус модерации: {course.moderation_status}</p>
            )}
          </div>

          <div className="course-item__course-actions">
            <LmsButton buttonText="Редактор курса" handleClick={() => handleEditCourseClick(course.id)} />
            <LmsButton buttonText="Все настройки курса" handleClick={() => handleSettingsCourseClick(course.id)} />
            <LmsButton buttonText="Архивировать курс" handleClick={() => handleArchiveClick(course.id)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyTeacherCourses;
