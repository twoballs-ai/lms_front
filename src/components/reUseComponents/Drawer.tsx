import React from 'react';
import { Drawer, Button, Space } from 'antd';

export default function LmsDrawerBase({ open, onClose, content }) {
  return (
    <Drawer
      title="Авторизация"
      placement="bottom"
      onClose={onClose}
      open={open}
      height="80vh"

    >
      {content}
    </Drawer>
  );
}