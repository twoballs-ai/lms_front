import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

export default function LmsModalBase({ open, onClose, content, modalStyles,showCloseIcon }) {

    const basicModalStyles = {
        modal: {
            maxWidth: '40vw',
            width: '40vw',
            height: 'auto',
            minHeight:'45vh',
            padding: '20px',
            margin: '0',
            overflow: 'none',
            borderRadius:'10px',
        },
        overlay: {
            background: 'rgba(0, 0, 0, 0.5)'
        }
    };

    const stylesToUse = modalStyles || basicModalStyles; // Используем modalStyles, если он передан, иначе используем basicModalStyles

    return (
        <Modal open={open} onClose={onClose}  center showCloseIcon={showCloseIcon} styles={stylesToUse}>
            {content}
        </Modal>
    );
}