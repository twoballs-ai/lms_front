import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

export default function LmsModalBase({ open, onClose, content, modalStyles }) {
    return (
        <Modal open={open} onClose={onClose} center styles={modalStyles}>
            {content}
        </Modal>
    );
}