import React, { useState } from "react";
import { Outlet, Link, useParams } from "react-router-dom";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Button, Modal } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import "./SettingsOutlet.scss";
import TeacherService from "../../../../services/teacher.service";

function SettingsOutlet() {
  const { course_id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const onClick = (e) => {
    console.log('click ', e);
  };

  const handleUpdate = async (e) => {
    console.log("dsds");
    const response = await TeacherService.sentToPublish(course_id);
    if (response.status === 200 || response.status === 201) {
      // Handle successful publish
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    const response = await TeacherService.deleteTeacherCourse(course_id);
    if (response.status === 200 || response.status === 201) {
      setIsModalOpen(false);
      navigate(`/teacher-profile/my-courses`); 
    }
    
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items = [
    {
      key: 'publish',
      label: (
        <Button type="primary" onClick={() => handleUpdate()} block>
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
          label: <Link to="edit-info">Обновить описание и обложку</Link>,
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
          <Outlet />
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
}

export default SettingsOutlet;
