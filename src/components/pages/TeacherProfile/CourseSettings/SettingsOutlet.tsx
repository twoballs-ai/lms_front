import React from "react";
import { Outlet ,Link, useParams } from "react-router-dom";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Button } from 'antd';
import "./SettingsOutlet.scss";
import TeacherService from "../../../../services/teacher.service";

function SettingsOutlet() {
  const { course_id } = useParams();
  const onClick = (e) => {
    console.log('click ', e);
  };

  const handleUpdate = async (e) => {
    console.log("dsds")
    // e.preventDefault();
    // const formData = new FormData();
    // formData.append('title', inputTitleValue);
    // formData.append('description', inputDescrValue);
    // formData.append('file', uploadedFile);
  
    const response = await TeacherService.sentToPublish(course_id);
    if (response.status === 200 || response.status === 201) {
  
    }
  };
  
  const items = [
    {
      key: 'publish',
      label: (
        <Button type="primary" onClick={() => console.log(handleUpdate())} block>
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
      //   {
      //     key: 'g2',
      //     label: 'Item 2',
  
      //   },
      ],
    },
  //   {
  //     key: 'sub2',
  //     label: 'Navigation Two',
  //     icon: <AppstoreOutlined />,
  //     children: [
  //       {
  //         key: '5',
  //         label: 'Option 5',
  //       },
  //       {
  //         key: '6',
  //         label: 'Option 6',
  //       },
  //       {
  //         key: 'sub3',
  //         label: 'Submenu',
  //         children: [
  //           {
  //             key: '7',
  //             label: 'Option 7',
  //           },
  //           {
  //             key: '8',
  //             label: 'Option 8',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     type: 'divider',
  //   },
  //   {
  //     key: 'sub4',
  //     label: 'Navigation Three',
  //     icon: <SettingOutlined />,
  //     children: [
  //       {
  //         key: '9',
  //         label: 'Option 9',
  //       },
  //       {
  //         key: '10',
  //         label: 'Option 10',
  //       },
  //       {
  //         key: '11',
  //         label: 'Option 11',
  //       },
  //       {
  //         key: '12',
  //         label: 'Option 12',
  //       },
  //     ],
  //   },
  //   {
  //     key: 'grp',
  //     label: 'Group',
  //     type: 'group',
  //     children: [
  //       {
  //         key: '13',
  //         label: 'Option 13',
  //       },
  //       {
  //         key: '14',
  //         label: 'Option 14',
  //       },
  //     ],
  //   },
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
    </>
  );
}

export default SettingsOutlet;
