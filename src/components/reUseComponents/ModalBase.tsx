import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

export default function LmsModalBase({ open, onClose, content, modalStyles, showCloseIcon }) {
    const basicModalStyles = {
        modal: {
            maxWidth: '40vw',
            width: '45vw',
            height: 'auto',
            minHeight: '45vh',
            padding: '20px',
            margin: '0',
            overflow: 'none',
            borderRadius: '10px',
        },
        overlay: {
            background: 'rgba(0, 0, 0, 0.5)',
        },
    };

    const mobileModalStyles = {
        modal: {
            maxWidth: '90vw',
            width: '90vw',
            minHeight: '30vh',
            borderRadius: '8px',
        },
        overlay: {
            background: 'rgba(0, 0, 0, 0.5)',
        },
    };

    // Определяем, использовать ли мобильные стили, основываясь на ширине окна
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const stylesToUse = modalStyles || (isMobile ? mobileModalStyles : basicModalStyles);

    return (
        <Modal 
            open={open} 
            onClose={onClose} 
            center 
            showCloseIcon={showCloseIcon} 
            styles={stylesToUse}
            closeOnOverlayClick={true} // Закрытие по клику на overlay
        >
            {content}
        </Modal>
    );
}
