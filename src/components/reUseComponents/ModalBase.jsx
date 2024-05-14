import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

export default function LmsModalBase({ open, onClose, content, modalStyles }) {

    const basicModalStyles = {
        modal: {
            maxWidth: '40vw',
            width: '40vw',
            height: '40vh',
            padding: '20px',
            margin: '0',
            overflow: 'none'
        },
        overlay: {
            background: 'rgba(0, 0, 0, 0.5)'
        }
    };

    const stylesToUse = modalStyles || basicModalStyles; // Используем modalStyles, если он передан, иначе используем basicModalStyles

    return (
        <Modal open={open} onClose={onClose} center styles={stylesToUse}>
            {content}
        </Modal>
    );
}