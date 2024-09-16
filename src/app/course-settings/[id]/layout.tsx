"use client"; // Для client-side рендеринга в Next.js
import { useParams, useRouter } from 'next/navigation'; // Не забываем импортировать useRouter для навигации
import { useState } from 'react';
import { Menu, Button, Modal } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import TeacherService from '@/services/teacher.service'; // Импортируйте ваш сервис с правильным путём

import './SettingsOutlet.scss'; // Если используете SCSS

export default function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const router = useRouter(); // Используем useRouter для перенаправления
  const course_id = params.id; 
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleUpdate = async () => {
    const response = await TeacherService.sentToPublish(course_id as string);
    if (response.status === 200 || response.status === 201) {
      // Обработка успешной публикации
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    const response = await TeacherService.deleteTeacherCourse(course_id as string);
    if (response.status === 200 || response.status === 201) {
      setIsModalOpen(false);
      router.push('/teacher-profile/my-courses'); // Перенаправление на другую страницу
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items = [
    {
      key: 'publish',
      label: (
        <Button type="primary" onClick={handleUpdate} block>
          Опубликовать
        </Button>
      ),
    },
    {
      key: 'sub1',
      label: 'Настроить курс',
      icon: <SettingOutlined />,
      children: [
        {
          key: 'edit-info',
          label: <Link href={`/course-settings/${course_id}/edit-info`}>Обновить описание и обложку</Link>, // Маршрут для обновления
        },
      ],
    },
    {
      key: 'delete',
      label: (
        <Button onClick={showModal} danger block>
          Удалить курс
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className="course-settings__container">
        <div className="container__left-menu">
          <Menu
            style={{ width: 320 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
          />
        </div>
        <div className="container__outlet">
          {children} {/* Это будет содержимое текущего роута */}
        </div>
      </div>

      {/* Модальное окно для удаления */}
      <Modal
        title="Подтверждение удаления"
        open={isModalOpen}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Подтвердить удаление"
        cancelText="Отмена"
      >
        <p>Вы уверены, что хотите удалить этот курс? Все данные курса будут потеряны.</p>
      </Modal>
    </>
  );
}
