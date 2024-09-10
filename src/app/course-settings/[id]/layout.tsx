"use client"; // Required for client-side rendering in Next.js
// app/settings/layout.tsx
import React, { useState } from "react";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Button, Modal } from 'antd';
import { useRouter, usePathname } from 'next/navigation'; // Используем Next.js роутер
import TeacherService from "@/services/teacher.service";
import "./SettingsOutlet.scss"; // Оставляем SCSS стили

const SettingsOutlet: React.FC = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const course_id = pathname?.split('/').pop(); // Извлекаем идентификатор курса из URL

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClick = (e: any) => {
    console.log('click ', e);
  };

  const handleUpdate = async () => {
    if (course_id) {
      const response = await TeacherService.sentToPublish(course_id as string);
      if (response.status === 200 || response.status === 201) {
        // Handle successful publish
      }
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (course_id) {
      const response = await TeacherService.deleteTeacherCourse(course_id as string);
      if (response.status === 200 || response.status === 201) {
        setIsModalOpen(false);
        router.push('/teacher-profile/my-courses'); 
      }
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
          label: <a href={`${course_id}/course-info-edit`}>Обновить описание и обложку</a>,
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
            onClick={onClick}
            style={{ width: 320 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
          />
        </div>
        <div className="container__outlet">
          {children} {/* Рендерим дочерние компоненты */}
        </div>
      </div>
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
};

export default SettingsOutlet;
