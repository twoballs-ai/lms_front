import React from 'react';
import { Drawer } from 'antd';
const PopupMenu = ({ handlePopupOpen, handlePopupClose, title, popupContent }) => {

  return (
    <>
      <Drawer  width={720} title={title} onClose={handlePopupClose} open={handlePopupOpen}>
      {popupContent}
      </Drawer>
    </>
  );
};
export default PopupMenu;